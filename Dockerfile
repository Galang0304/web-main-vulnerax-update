# Gunakan Node.js versi 20.18.1
FROM node:20.18.1

# Set working directory
WORKDIR /app

# Copy file yang diperlukan dulu
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code
COPY . .

# Jalankan build
RUN npm run build

# Expose port yang digunakan oleh Next.js
EXPOSE 3000

# Jalankan aplikasi di mode production
CMD ["npm", "run", "start"]
