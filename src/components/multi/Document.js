// /src/components/multi/Document.js
import { Page, Text, View, Document, StyleSheet, Image, Link } from '@react-pdf/renderer';
import useTestStore from '@/store/report-store';
import { questionTest } from '@/app/pages/api/question';

// Objek terjemahan untuk Bahasa Inggris dan Indonesia
const translations = {
  en: {
    companyHeader: 'Company Name:',
    timestamp: 'Timestamp:',
    outcomeSummary: 'OUTCOME SUMMARY',
    summaryMessage: (totalScore, riskLevel, rating) => {
      if (rating === 'A') {
        return `Well done, cyber guardian! Your organization has aced the (RRA) Ransomware Readiness Assessment with a stellar score of ${totalScore}%, placing you at a ${riskLevel} risk level. It’s like you’ve built a fortress with a moat full of alligators—ransomware doesn’t stand a chance! Keep up the great work, but don’t get too comfy; even the best knights polish their armor regularly.`;
      } else if (rating === 'B') {
        return `Phew, that was close! Your organization has completed the (RRA) Ransomware Readiness Assessment with a score of ${totalScore}%, landing you at a ${riskLevel} risk level. It’s like you’re in a cybersecurity escape room— you’ve found some clues, but the clock is ticking! Time to channel your inner detective, grab a magnifying glass, and shore up those defenses before the ransomware villain makes its next move.`;
      } else {
        return `Upps.. Houston, we have a problem! Your organization has completed the (RRA) Ransomware Readiness Assessment, but with a score of ${totalScore}%, you’re at a ${riskLevel} risk level. It’s like leaving your front door wide open with a neon sign saying “Ransomware Welcome Party!”—not the kind of RSVP you want. Let’s roll up our sleeves, batten down the hatches, and turn this ship around before the cyber pirates strike!`;
      }
    },
    strategy: 'Strategy',
    tactics: 'Tactics',
    categories: 'Categories',
    preparedAssessments: (prepared, total) =>
      `${prepared} out of ${total} assessments were prepared for the ransomware attack`,
    overallRisk: 'OVERALL RISK',
    strategyRisk: 'STRATEGY RISK',
    tacticsRisk: 'TACTICS RISK',
    readinessScore: (score) => `${score}% Readiness Score`,
    overallRiskDesc: 'Comprehensive evaluation of organizational ransomware preparedness',
    strategyRiskDesc: 'Governance, planning, and policy-related risks',
    tacticsRiskDesc: 'Technical controls and operational implementation risks',
    assessmentDetails: 'ASSESSMENT DETAILS',
    assessmentDesc: `We assess your preparedness against ransomware based on international standards and regulations such as NIST (National Institute of Standards and Technology), ISO/IEC Standards, CISA (Cyber Security and Infrastructure Security Agency), GDPR (General Data Protection Regulation), PDP Law (Personal Data Protection), CCPA (California Consumer Privacy Act), OFAC (Office of Foreign Assets Control), & other international regulations, to ensure your organization or business meets high-level cybersecurity standards and complies with applicable regulations.`,
    tableHeaders: {
      category: 'Category',
      checklistItem: 'Checklist Item',
      code: 'Code',
      score: 'Score',
      recommendation: 'Recommendation',
    },
    recommendationsDetails: 'RECOMMENDATIONS DETAILS',
    recommendationsDesc: `Recommended actions to improve organizational and business preparedness against ransomware, based on international standards such as NIST, ISO/IEC, and regulations such as GDPR and OFAC. The goal is to fix security gaps, ensure compliance, and minimize the impact of attacks. Recommendations include:`,
    recommendationPoints: [
      '- Policies & Procedures: Update security policy and incident response plan (NIST, ISO/IEC 27001)',
      '- Training: Raise employee awareness through regular training and phishing simulations (NIST SP-800-171)',
      '- Risk Management & Backup: Conduct risk assessments, ensure secure backups, and test data recovery (ISO 22301, NIST SP 800-171)',
      '- Incident Response: Form an incident response team, set up organizational protocols, and comply with regulations such as OFAC',
      '- Technical Security: Implement access control, network segmentation, and threat detection solutions (MITRE ATT&CK, NIST SP 800-37) and other standards and regulations',
    ],
    footer: {
      website: 'vulnerax.com',
      reportTitle: 'Ransomware Readiness Assessment Report',
      confidential: 'Confidential - For Internal Use Only',
      generated: (timestamp) => `Assessment Generated: ${timestamp}`,
    },
  },
  id: {
    companyHeader: 'Nama Perusahaan:',
    timestamp: 'Waktu Pembuatan:',
    outcomeSummary: 'RINGKASAN HASIL',
    summaryMessage: (totalScore, riskLevel, rating) => {
      if (rating === 'A') {
        return `Hebat sekali, penjaga siber! Organisasi Anda telah lulus Penilaian Kesiapan Ransomware (RRA) dengan skor gemilang ${totalScore}%, menempatkan Anda pada tingkat risiko ${riskLevel}. Ini seperti membangun benteng dengan parit penuh buaya—ransomware tak punya peluang! Pertahankan kerja bagus, tapi jangan terlalu santai; bahkan ksatria terbaik selalu memoles baju zirah mereka secara rutin.`;
      } else if (rating === 'B') {
        return `Wah, itu tadi hampir saja! Organisasi Anda telah menyelesaikan Penilaian Kesiapan Ransomware (RRA) dengan skor ${totalScore}%, menempatkan Anda pada tingkat risiko ${riskLevel}. Ini seperti berada di ruang teka-teki keamanan siber—Anda sudah menemukan beberapa petunjuk, tapi waktu terus berdetak! Saatnya jadi detektif, ambil kaca pembesar, dan perkuat pertahanan sebelum penjahat ransomware membuat langkah berikutnya.`;
      } else {
        return `Upps.. Houston, kita punya masalah! Organisasi Anda telah menyelesaikan Penilaian Kesiapan Ransomware (RRA), tapi dengan skor ${totalScore}%, Anda berada pada tingkat risiko ${riskLevel}. Ini seperti membiarkan pintu depan terbuka lebar dengan tanda neon bertuliskan “Pesta Selamat Datang Ransomware!”—bukan undangan yang Anda inginkan. Ayo gulung lengan baju, kunci semua pintu, dan balikkan keadaan sebelum bajak laut siber menyerang!`;
      }
    },
    strategy: 'Strategi',
    tactics: 'Taktik',
    categories: 'Kategori',
    preparedAssessments: (prepared, total) =>
      `${prepared} dari ${total} penilaian telah siap menghadapi serangan ransomware`,
    overallRisk: 'RISIKO KESELURUHAN',
    strategyRisk: 'RISIKO STRATEGI',
    tacticsRisk: 'RISIKO TAKTIK',
    readinessScore: (score) => `Skor Kesiapan ${score}%`,
    overallRiskDesc: 'Evaluasi menyeluruh terhadap kesiapan organisasi menghadapi ransomware',
    strategyRiskDesc: 'Risiko terkait tata kelola, perencanaan, dan kebijakan',
    tacticsRiskDesc: 'Risiko implementasi teknis dan operasional',
    assessmentDetails: 'DETAIL PENILAIAN',
    assessmentDesc: `Kami menilai kesiapan Anda terhadap ransomware berdasarkan standar dan regulasi internasional seperti NIST (National Institute of Standards and Technology), Standar ISO/IEC, CISA (Cyber Security and Infrastructure Security Agency), GDPR (General Data Protection Regulation), UU PDP (Perlindungan Data Pribadi), CCPA (California Consumer Privacy Act), OFAC (Office of Foreign Assets Control), & regulasi internasional lainnya, untuk memastikan organisasi atau bisnis Anda memenuhi standar keamanan siber tingkat tinggi dan mematuhi regulasi yang berlaku.`,
    tableHeaders: {
      category: 'Kategori',
      checklistItem: 'Item Daftar Periksa',
      code: 'Kode',
      score: 'Skor',
      recommendation: 'Rekomendasi',
    },
    recommendationsDetails: 'DETAIL REKOMENDASI',
    recommendationsDesc: `Tindakan yang direkomendasikan untuk meningkatkan kesiapan organisasi dan bisnis terhadap ransomware, berdasarkan standar internasional seperti NIST, ISO/IEC, dan regulasi seperti GDPR dan OFAC. Tujuannya adalah untuk memperbaiki celah keamanan, memastikan kepatuhan, dan meminimalkan dampak serangan. Rekomendasi meliputi:`,
    recommendationPoints: [
      '- Kebijakan & Prosedur: Perbarui kebijakan keamanan dan rencana respons insiden (NIST, ISO/IEC 27001)',
      '- Pelatihan: Tingkatkan kesadaran karyawan melalui pelatihan rutin dan simulasi phishing (NIST SP-800-171)',
      '- Manajemen Risiko & Cadangan: Lakukan penilaian risiko, pastikan cadangan aman, dan uji pemulihan data (ISO 22301, NIST SP 800-171)',
      '- Respons Insiden: Bentuk tim respons insiden, siapkan protokol organisasi, dan patuhi regulasi seperti OFAC',
      '- Keamanan Teknis: Terapkan kontrol akses, segmentasi jaringan, dan solusi deteksi ancaman (MITRE ATT&CK, NIST SP 800-37) serta standar dan regulasi lainnya',
    ],
    footer: {
      website: 'vulnerax.com',
      reportTitle: 'Laporan Penilaian Kesiapan Ransomware',
      confidential: 'Rahasia - Hanya Untuk Penggunaan Internal',
      generated: (timestamp) => `Penilaian Dibuat: ${timestamp}`,
    },
  },
};

// Struktur data rekomendasi berdasarkan dokumen Excel (dengan terjemahan)
const recommendationsMap = {
  'A.1.1': {
    10: {
      en: 'Immediately create or update a cybersecurity policy that includes ransomware prevention, detection, response, and recovery. Align with NIST SP 800-53 or ISO/IEC 27001 standards.',
      id: 'Segera buat atau perbarui kebijakan keamanan siber yang mencakup pencegahan, deteksi, respons, dan pemulihan ransomware. Sesuaikan dengan standar NIST SP 800-53 atau ISO/IEC 27001.',
    },
    20: {
      en: 'Accelerate the policy drafting process and ensure it covers all aspects of cybersecurity.',
      id: 'Percepat proses penyusunan kebijakan dan pastikan mencakup semua aspek keamanan siber.',
    },
  },
  'A.1.2': {
    10: {
      en: 'Involve cross-functional teams (IT, legal, PR, management) in cyber risk planning. Use the NIST CSF framework.',
      id: 'Libatkan tim lintas fungsi (IT, legal, PR, manajemen) dalam perencanaan risiko siber. Gunakan kerangka kerja NIST CSF.',
    },
    20: {
      en: 'Accelerate coordination between departments and ensure the plan covers all cyber risk aspects.',
      id: 'Percepat koordinasi antar-departemen dan pastikan rencana mencakup semua aspek risiko siber.',
    },
  },
  'A.1.3': {
    10: {
      en: 'Conduct an inventory of digital and physical assets, then prioritize based on business impact. Use the NIST SP 800-30 approach.',
      id: 'Lakukan inventarisasi aset digital dan fisik, lalu prioritaskan berdasarkan dampak bisnis. Gunakan pendekatan NIST SP 800-30.',
    },
    20: {
      en: 'Accelerate the inventory process and ensure all assets are prioritized.',
      id: 'Percepat proses inventarisasi dan pastikan semua aset telah diprioritaskan.',
    },
  },
  'A.2.1': {
    10: {
      en: 'Ensure the risk map includes the likelihood and impact of ransomware attacks. Use ISO 27005 or NIST IRAM methodology.',
      id: 'Pastikan peta risiko mencakup kemungkinan dan dampak serangan ransomware. Gunakan metodologi ISO 27005 atau NIST IRAM.',
    },
    20: {
      en: 'Accelerate the risk assessment process and ensure the risk map is updated regularly.',
      id: 'Percepat proses penilaian risiko dan pastikan peta risiko diperbarui secara berkala.',
    },
  },
  'A.2.2': {
    10: {
      en: 'Conduct risk assessments on vendors and business partners. Ensure contracts include cybersecurity clauses.',
      id: 'Lakukan penilaian risiko terhadap vendor dan mitra bisnis. Pastikan kontrak mencakup klausul keamanan siber.',
    },
    20: {
      en: 'Accelerate the risk assessment process and ensure all vendors are evaluated.',
      id: 'Percepat proses penilaian risiko dan pastikan semua vendor telah dinilai.',
    },
  },
  'A.3.1': {
    10: {
      en: 'Ensure the insurance policy covers recovery costs, ransom payments, and business losses due to ransomware.',
      id: 'Pastikan polis asuransi mencakup biaya pemulihan, pembayaran tebusan, dan kerugian bisnis akibat ransomware.',
    },
    20: {
      en: 'Discuss with the insurance broker to understand coverage and exclusions.',
      id: 'Diskusikan dengan broker asuransi untuk memahami cakupan dan pengecualian.',
    },
  },
  'A.4.1': {
    10: {
      en: 'Conduct regular training to increase employee awareness of cyber threats like phishing.',
      id: 'Lakukan pelatihan rutin untuk meningkatkan kesadaran karyawan tentang ancaman siber seperti phishing.',
    },
    20: {
      en: 'Accelerate the implementation of the training program and ensure all employees are trained.',
      id: 'Percepat implementasi program pelatihan dan pastikan semua karyawan telah dilatih.',
    },
  },
  'A.4.2': {
    10: {
      en: 'Prepare a Business Continuity Plan (BCP) based on ISO 22301.',
      id: 'Siapkan rencana bisnis berkelanjutan (BCP) berdasarkan ISO 22301.',
    },
    20: {
      en: 'Train management to understand the strategic impact of ransomware.',
      id: 'Latih manajemen untuk memahami dampak strategis ransomware.',
    },
  },
  'A.5.1': {
    10: {
      en: 'Create or update an incident response plan that includes detection, isolation, recovery, and communication.',
      id: 'Buat atau perbarui rencana respons insiden yang mencakup deteksi, isolasi, pemulihan, dan komunikasi.',
    },
    20: {
      en: 'Accelerate the implementation of the plan and conduct regular drills.',
      id: 'Percepat implementasi rencana dan lakukan latihan rutin.',
    },
  },
  'A.5.2': {
    10: {
      en: 'Create procedures involving management, legal, and finance teams to evaluate ransom payment decisions.',
      id: 'Buat prosedur yang melibatkan tim manajemen, legal, dan keuangan untuk mengevaluasi keputusan membayar tebusan.',
    },
    20: {
      en: 'Accelerate the drafting of procedures and ensure all teams are involved.',
      id: 'Percepat penyusunan prosedur dan pastikan semua tim terlibat.',
    },
  },
  'A.5.3': {
    10: {
      en: 'Train the crisis management team to make quick decisions under pressure.',
      id: 'Latih tim manajemen krisis untuk mengambil keputusan cepat di bawah tekanan.',
    },
    20: {
      en: 'Accelerate training and ensure all team members are trained.',
      id: 'Percepat pelatihan dan pastikan semua anggota tim telah dilatih.',
    },
  },
  'A.6.1': {
    10: {
      en: 'Learn about regulations like GDPR, PDP Law, or CCPA that mandate cyber incident reporting.',
      id: 'Pelajari regulasi seperti GDPR, UU PDP, atau CCPA yang mewajibkan pelaporan insiden siber.',
    },
    20: {
      en: 'Accelerate the reporting process and ensure compliance with deadlines and requirements.',
      id: 'Percepat proses pelaporan dan pastikan sesuai dengan batas waktu dan persyaratan.',
    },
  },
  'A.6.2': {
    10: {
      en: 'Create a protocol to involve law enforcement or regulators in incident investigations.',
      id: 'Buat protokol untuk melibatkan penegak hukum atau regulator dalam investigasi insiden.',
    },
    20: {
      en: 'Accelerate the implementation of the protocol and ensure the legal team understands rights and obligations.',
      id: 'Percepat implementasi protokol dan pastikan tim legal memahami hak dan kewajiban.',
    },
  },
  'A.7.1': {
    10: {
      en: 'Prepare a script or negotiation guide that includes key questions, time limits, and escalation steps.',
      id: 'Siapkan skrip atau panduan negosiasi yang mencakup pertanyaan kunci, batasan waktu, dan langkah-langkah eskalasi.',
    },
    20: {
      en: 'Accelerate the drafting of procedures and ensure all teams are involved.',
      id: 'Percepat penyusunan prosedur dan pastikan semua tim terlibat.',
    },
  },
  'A.7.2': {
    10: {
      en: 'Train the team to handle psychological pressure, such as threats of data leaks or tight deadlines.',
      id: 'Latih tim untuk menghadapi tekanan psikologis seperti ancaman kebocoran data atau tenggat waktu yang ketat.',
    },
    20: {
      en: 'Accelerate training and ensure all team members are trained.',
      id: 'Percepat pelatihan dan pastikan semua anggota tim telah dilatih.',
    },
  },
  'A.8.1': {
    10: {
      en: 'Form a team consisting of legal experts, IT, and professional negotiators.',
      id: 'Bentuk tim yang terdiri dari ahli hukum, IT, dan negosiator profesional.',
    },
    20: {
      en: 'Accelerate the formation of the team and ensure they have quick access to necessary information.',
      id: 'Percepat pembentukan tim dan pastikan mereka memiliki akses cepat ke informasi yang diperlukan.',
    },
  },
  'A.9.1': {
    10: {
      en: 'Prepare an emergency fund or ensure the insurance policy covers ransom payments.',
      id: 'Siapkan dana darurat atau pastikan polis asuransi mencakup pembayaran tebusan.',
    },
    20: {
      en: 'Discuss with the finance team to ensure the availability of funds.',
      id: 'Diskusikan dengan tim keuangan untuk memastikan ketersediaan dana.',
    },
  },
  'A.9.2': {
    10: {
      en: 'Create a clear policy on when and how ransom payment decisions are made.',
      id: 'Buat kebijakan yang jelas tentang kapan dan bagaimana keputusan membayar tebusan diambil.',
    },
    20: {
      en: 'Accelerate the drafting of the policy and ensure all teams are involved.',
      id: 'Percepat penyusunan kebijakan dan pastikan semua tim terlibat.',
    },
  },
  'A.10.1': {
    10: {
      en: 'Use encrypted communication tools like Tor or specialized platforms to interact with ransomware actors.',
      id: 'Gunakan alat komunikasi terenkripsi seperti Tor atau platform khusus untuk berinteraksi dengan pelaku ransomware.',
    },
    20: {
      en: 'Accelerate the implementation of secure communication channels.',
      id: 'Percepat implementasi saluran komunikasi aman.',
    },
  },
  'B.1.1': {
    10: {
      en: 'Implement MFA on all accounts with access to sensitive systems or data.',
      id: 'Terapkan MFA pada semua akun yang memiliki akses ke sistem atau data sensitif.',
    },
    20: {
      en: 'Accelerate the implementation of MFA and ensure all sensitive accounts are protected.',
      id: 'Percepat implementasi MFA dan pastikan semua akun sensitif terlindungi.',
    },
  },
  'B.1.2': {
    10: {
      en: 'Ensure the password policy includes a minimum length of 12 characters, complexity, and a change frequency of every 90 days.',
      id: 'Pastikan kebijakan kata sandi mencakup panjang minimal 12 karakter, kompleksitas, dan frekuensi penggantian setiap 90 hari.',
    },
    20: {
      en: 'Accelerate the implementation of the password policy.',
      id: 'Percepat implementasi kebijakan kata sandi.',
    },
  },
  'B.1.3': {
    10: {
      en: 'Limit user access based on the principle of least privilege.',
      id: 'Batasi akses pengguna berdasarkan prinsip least privilege.',
    },
    20: {
      en: 'Accelerate the implementation of the least privilege principle.',
      id: 'Percepat implementasi prinsip least privilege.',
    },
  },
  'B.2.1': {
    10: {
      en: 'Segment the network to limit the spread of ransomware.',
      id: 'Segmentasi jaringan untuk membatasi penyebaran ransomware.',
    },
    20: {
      en: 'Accelerate the implementation of network segmentation.',
      id: 'Percepat implementasi segmentasi jaringan.',
    },
  },
  'B.2.2': {
    10: {
      en: 'Isolate sensitive data from other parts of the network with strict access controls.',
      id: 'Isolasi data sensitif dari bagian lain jaringan dengan kontrol akses yang ketat.',
    },
    20: {
      en: 'Accelerate the implementation of data isolation.',
      id: 'Percepat implementasi isolasi data.',
    },
  },
  'B.3.1': {
    10: {
      en: 'Ensure data backups are encrypted and not connected to the main network (offline/immutable).',
      id: 'Pastikan backup data terenkripsi dan tidak terhubung ke jaringan utama (offline/immutable).',
    },
    20: {
      en: 'Accelerate the implementation of data backups.',
      id: 'Percepat implementasi backup data.',
    },
  },
  'B.3.2': {
    10: {
      en: 'Conduct regular recovery tests for backups.',
      id: 'Lakukan uji pemulihan backup secara berkala.',
    },
    20: {
      en: 'Accelerate the recovery testing process.',
      id: 'Percepat proses uji pemulihan.',
    },
  },
  'B.4.1': {
    10: {
      en: 'Use EDR/XDR solutions to detect and respond to threats at the endpoint level.',
      id: 'Gunakan solusi EDR/XDR untuk mendeteksi dan merespons ancaman di tingkat endpoint.',
    },
    20: {
      en: 'Accelerate the implementation of EDR/XDR solutions.',
      id: 'Percepat implementasi solusi EDR/XDR.',
    },
  },
  'B.4.2': {
    10: {
      en: 'Ensure all devices are updated with the latest security patches.',
      id: 'Pastikan semua perangkat diperbarui dengan patch keamanan terbaru.',
    },
    20: {
      en: 'Accelerate the software update process.',
      id: 'Percepat proses pembaruan perangkat lunak.',
    },
  },
  'B.5.1': {
    10: {
      en: 'Implement SIEM to monitor and analyze network activity.',
      id: 'Implementasikan SIEM untuk memantau dan menganalisis aktivitas jaringan.',
    },
    20: {
      en: 'Accelerate the implementation of SIEM.',
      id: 'Percepat implementasi SIEM.',
    },
  },
  'B.5.2': {
    10: {
      en: 'Update IoCs regularly based on the latest threats.',
      id: 'Perbarui IoCs secara berkala berdasarkan ancaman terbaru.',
    },
    20: {
      en: 'Accelerate the IoC update process.',
      id: 'Percepat proses pembaruan IoCs.',
    },
  },
  'B.6.1': {
    10: {
      en: 'Use AI or machine learning-based email filters to detect and block phishing emails.',
      id: 'Gunakan filter email berbasis AI atau machine learning untuk mendeteksi dan memblokir email phishing.',
    },
    20: {
      en: 'Accelerate the implementation of email filters.',
      id: 'Percepat implementasi filter email.',
    },
  },
  'B.6.2': {
    10: {
      en: 'Conduct regular phishing simulation training.',
      id: 'Lakukan pelatihan simulasi phishing secara berkala.',
    },
    20: {
      en: 'Accelerate the implementation of the phishing simulation program.',
      id: 'Percepat implementasi program simulasi phishing.',
    },
  },
  'B.7.1': {
    10: {
      en: 'Prepare procedures to isolate infected systems and limit the spread of ransomware.',
      id: 'Siapkan prosedur untuk mengisolasi sistem yang terinfeksi dan membatasi penyebaran ransomware.',
    },
    20: {
      en: 'Accelerate the implementation of isolation procedures.',
      id: 'Percepat implementasi prosedur isolasi.',
    },
  },
  'B.7.2': {
    10: {
      en: 'Create a policy to disconnect from the Internet if necessary during a ransomware attack.',
      id: 'Buat kebijakan untuk memutus koneksi Internet jika diperlukan selama serangan ransomware.',
    },
    20: {
      en: 'Accelerate the implementation of the policy.',
      id: 'Percepat implementasi kebijakan.',
    },
  },
  'B.8.1': {
    10: {
      en: 'Prepare structured and tested data recovery procedures.',
      id: 'Siapkan prosedur pemulihan data yang terstruktur dan teruji.',
    },
    20: {
      en: 'Accelerate the implementation of recovery procedures.',
      id: 'Percepat implementasi prosedur pemulihan.',
    },
  },
  'B.8.2': {
    10: {
      en: 'Identify essential services and create a priority recovery plan.',
      id: 'Identifikasi layanan esensial dan buat rencana pemulihan prioritas.',
    },
    20: {
      en: 'Accelerate the identification and planning process.',
      id: 'Percepat proses identifikasi dan pembuatan rencana.',
    },
  },
  'B.9.1': {
    10: {
      en: 'Conduct post-incident analysis to identify security gaps and areas for improvement.',
      id: 'Lakukan analisis pasca insiden untuk mengidentifikasi celah keamanan dan area perbaikan.',
    },
    20: {
      en: 'Accelerate the analysis process and ensure all incidents are analyzed.',
      id: 'Percepat proses analisis dan pastikan semua insiden dianalisis.',
    },
  },
  'B.9.2': {
    10: {
      en: 'Update the incident response plan based on lessons learned from previous incidents.',
      id: 'Perbarui rencana respons insiden berdasarkan pelajaran yang dipetik dari insiden sebelumnya.',
    },
    20: {
      en: 'Accelerate the plan update process.',
      id: 'Percepat proses pembaruan rencana.',
    },
  },
  'B.10.1': {
    10: {
      en: 'Conduct risk assessments on vendors and partners to ensure they have adequate protection measures.',
      id: 'Lakukan penilaian risiko terhadap vendor dan mitra untuk memastikan mereka memiliki langkah perlindungan yang memadai.',
    },
    20: {
      en: 'Accelerate the risk assessment process.',
      id: 'Percepat proses penilaian risiko.',
    },
  },
  'B.10.2': {
    10: {
      en: 'Ensure contracts with vendors include clauses for incident reporting.',
      id: 'Pastikan kontrak dengan vendor mencakup klausul pelaporan insiden keamanan.',
    },
    20: {
      en: 'Accelerate the contract drafting process.',
      id: 'Percepat proses penyusunan kontrak.',
    },
  },
  'B.11.1': {
    10: {
      en: 'Create a policy to verify the claims of attackers, including requesting "proof of life" for data.',
      id: 'Buat kebijakan untuk memverifikasi tuntutan pelaku, termasuk meminta "proof of life" data.',
    },
    20: {
      en: 'Accelerate the policy drafting process.',
      id: 'Percepat penyusunan kebijakan.',
    },
  },
  'B.12.1': {
    10: {
      en: 'Use the MITRE ATT&CK framework to track and analyze attacker tactics.',
      id: 'Gunakan kerangka kerja MITRE ATT&CK untuk melacak dan menganalisis taktik pelaku.',
    },
    20: {
      en: 'Accelerate the implementation of the framework.',
      id: 'Percepat implementasi kerangka kerja.',
    },
  },
  'B.13.1': {
    10: {
      en: 'Consider using ransomware consultants or specialized analysis tools to assist with negotiations.',
      id: 'Pertimbangkan menggunakan layanan konsultan ransomware atau alat analisis khusus untuk membantu proses negosiasi.',
    },
    20: {
      en: 'Accelerate the implementation of negotiation tools.',
      id: 'Percepat implementasi alat negosiasi.',
    },
  },
  'B.14.1': {
    10: {
      en: 'Ensure negotiation decisions comply with regulations like OFAC or PPATK.',
      id: 'Pastikan keputusan negosiasi mematuhi regulasi seperti OFAC atau PPATK.',
    },
    20: {
      en: 'Accelerate the consultation process with the legal team.',
      id: 'Percepat proses konsultasi dengan tim legal.',
    },
  },
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    position: 'relative',
  },
  header: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: '25%',
  },
  companyHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2A4365',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 10,
    color: '#718096',
    marginBottom: 25,
  },
  radarFrame: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  radarBox: {
    width: '24%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 12,
    backgroundColor: '#F7FAFC',
  },
  radarTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  radarImage: {
    width: 100,
    height: 100,
    marginVertical: 5,
  },
  radarScore: {
    fontSize: 10,
    color: '#4A5568',
    textAlign: 'center',
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2A4365',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E0',
    paddingBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableColHeader: {
    width: '20%', // Adjusted for 5 columns
    backgroundColor: '#D32F2F', // Solid red background for all headers
    padding: 8,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text for all headers
  },
  tableCol: {
    width: '20%',
    padding: 8,
    fontSize: 9,
    color: '#4A5568',
  },
  tableColScore: {
    width: '20%',
    padding: 8,
    fontSize: 9,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendationTable: {
    width: '100%',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  summaryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F7FAFC',
  },
  summaryText: {
    fontSize: 10,
    color: '#2A4365',
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 8,
  },
  footerLogo: {
    width: 90,
    height: 24,
  },
  footerText: {
    fontSize: 8,
    color: '#718096',
    textAlign: 'right',
  },
  footerLink: {
    fontSize: 8,
    color: '#2B6CB0',
    textDecoration: 'underline',
  },
  checklistIcon: {
    width: 12,
    height: 12,
    marginLeft: 5,
  },
});

const MyDocument = ({ companyData = {}, language = 'en' }) => {
  const { scores = {} } = useTestStore() || {}; // Tambahkan default value untuk scores
  const timestamp = new Date().toLocaleString();
  const t = translations[language]; // Ambil terjemahan berdasarkan bahasa

  // Definisikan translatedQuestionTest di dalam komponen agar dapat mengakses language
  const translatedQuestionTest = {
    strategic: questionTest.strategic.map((category) => ({
      ...category,
      category: category[`category_${language}`] || category.category_en, // Pilih category berdasarkan bahasa
      detail: category.detail.map((q) => ({
        ...q,
        question: q[`question_${language}`] || q.question_en, // Pilih pertanyaan berdasarkan bahasa
      })),
    })),
    tactic: questionTest.tactic.map((category) => ({
      ...category,
      category: category[`category_${language}`] || category.category_en, // Pilih category berdasarkan bahasa
      detail: category.detail.map((q) => ({
        ...q,
        question: q[`question_${language}`] || q.question_en, // Pilih pertanyaan berdasarkan bahasa
      })),
    })),
  };

  // Pindahkan getRecommendations ke dalam MyDocument
  const getRecommendations = (scores, language) => {
    return [...translatedQuestionTest.strategic, ...translatedQuestionTest.tactic].flatMap((category) =>
      category.detail
        .filter((q) => {
          const score = scores[q.code] || 0;
          return score === 10 || score === 20; // Only include scores 10 or 20
        })
        .map((q) => {
          const score = scores[q.code] || 0;
          const recommendation = recommendationsMap[q.code]
            ? recommendationsMap[q.code][score][language] || 'No specific recommendation available.'
            : 'No specific recommendation available.';
          return {
            category: category.category,
            checklist: q.question, // Gunakan q.question yang sudah diterjemahkan
            code: q.code,
            score: score,
            recommendation,
          };
        })
    );
  };

  const companyName = companyData?.company_name || 'Unknown Company';

  const strategicScore = translatedQuestionTest.strategic
    .flatMap((cat) => cat.detail.map((q) => scores[q.code] || 0))
    .reduce((a, b) => a + b, 0);

  const tacticScore = translatedQuestionTest.tactic
    .flatMap((cat) => cat.detail.map((q) => scores[q.code] || 0))
    .reduce((a, b) => a + b, 0);

  const totalScore = ((strategicScore / 570) * 40 + (tacticScore / 750) * 60).toFixed(1);

  const totalStrategyQuestions = translatedQuestionTest.strategic.reduce(
    (sum, cat) => sum + cat.detail.length,
    0
  );
  const preparedStrategyQuestions = translatedQuestionTest.strategic
    .flatMap((cat) => cat.detail)
    .filter((q) => scores[q.code] === 30).length;
  const totalTacticQuestions = translatedQuestionTest.tactic.reduce(
    (sum, cat) => sum + cat.detail.length,
    0
  );
  const preparedTacticQuestions = translatedQuestionTest.tactic
    .flatMap((cat) => cat.detail)
    .filter((q) => scores[q.code] === 30).length;

  const riskLevel = totalScore >= 70 ? (language === 'en' ? 'low' : 'rendah') : totalScore >= 40 ? (language === 'en' ? 'medium' : 'sedang') : (language === 'en' ? 'high' : 'tinggi');
  const rating = totalScore >= 70 ? 'A' : totalScore >= 40 ? 'B' : 'C';
  const summaryMessage = t.summaryMessage(totalScore, riskLevel, rating);

  const radarAll = localStorage.getItem('radarChart-all');
  const radarStrategic = localStorage.getItem('radarChart-strategic');
  const radarTactic = localStorage.getItem('radarChart-tactic');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.header} src="/img/logo.png" />

        <Text style={styles.companyHeader}>{t.companyHeader} {companyName}</Text>
        <Text style={styles.timestamp}>{t.timestamp} {timestamp}</Text>

        {/* Outcome Summary */}
        <Text style={styles.sectionTitle}>{t.outcomeSummary}</Text>
        <Text style={{ fontSize: 12, marginBottom: 10, color: '#2C5282' }}>
          {summaryMessage}
        </Text>
        <View style={styles.summaryBox}>
          <View style={{ width: '45%' }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2C5282' }}>
              {t.strategy}
            </Text>
            <Text style={styles.summaryText}>{translatedQuestionTest.strategic.length} {t.categories}</Text>
            <Text style={styles.summaryText}>
              {t.preparedAssessments(preparedStrategyQuestions, totalStrategyQuestions)}
            </Text>
          </View>
          <View style={{ width: '45%' }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2C5282' }}>
              {t.tactics}
            </Text>
            <Text style={styles.summaryText}>{translatedQuestionTest.tactic.length} {t.categories}</Text>
            <Text style={styles.summaryText}>
              {t.preparedAssessments(preparedTacticQuestions, totalTacticQuestions)}
            </Text>
          </View>
        </View>

        {/* Radar Charts Section */}
        <View style={styles.radarFrame}>
          <View style={styles.radarBox}>
            <Text style={styles.radarTitle}>{t.overallRisk}</Text>
            {radarAll && <Image src={radarAll} style={styles.radarImage} cache={false} />}
            <Text style={styles.radarScore}>{t.readinessScore(totalScore)}</Text>
            <Text style={{ fontSize: 9, textAlign: 'center', color: '#718096' }}>
              {t.overallRiskDesc}
            </Text>
          </View>
          <View style={styles.radarBox}>
            <Text style={styles.radarTitle}>{t.strategyRisk}</Text>
            {radarStrategic && (
              <Image src={radarStrategic} style={styles.radarImage} cache={false} />
            )}
            <Text style={styles.radarScore}>{strategicScore}/570 Points</Text>
            <Text style={{ fontSize: 9, textAlign: 'center', color: '#718096' }}>
              {t.strategyRiskDesc}
            </Text>
          </View>
          <View style={styles.radarBox}>
            <Text style={styles.radarTitle}>{t.tacticsRisk}</Text>
            {radarTactic && (
              <Image src={radarTactic} style={styles.radarImage} cache={false} />
            )}
            <Text style={styles.radarScore}>{tacticScore}/750 Points</Text>
            <Text style={{ fontSize: 9, textAlign: 'center', color: '#718096' }}>
              {t.tacticsRiskDesc}
            </Text>
          </View>
        </View>

        {/* Assessment Details (Hanya Deskripsi, Tanpa Tabel) */}
        <Text style={styles.sectionTitle}>{t.assessmentDetails}</Text>
        <Text style={{ fontSize: 10, marginBottom: 20, color: '#4A5568' }}>
          {t.assessmentDesc}
        </Text>

        {/* Recommendations */}
        <Text style={styles.sectionTitle}>{t.recommendationsDetails}</Text>
        <Text style={{ fontSize: 10, marginBottom: 10, color: '#4A5568' }}>
          {t.recommendationsDesc}
        </Text>
        {t.recommendationPoints.map((point, index) => (
          <Text key={index} style={{ fontSize: 10, marginBottom: 10, color: '#4A5568' }}>
            {point}
          </Text>
        ))}

        <View style={styles.recommendationTable}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>{t.tableHeaders.category}</Text>
            <Text style={styles.tableColHeader}>{t.tableHeaders.checklistItem}</Text>
            <Text style={styles.tableColHeader}>{t.tableHeaders.code}</Text>
            <Text style={styles.tableColHeader}>{t.tableHeaders.score}</Text>
            <Text style={styles.tableColHeader}>{t.tableHeaders.recommendation}</Text>
          </View>
          {getRecommendations(scores, language).map((rec, i) => (
            <View
              key={i}
              style={[
                styles.tableRow,
                {
                  backgroundColor: rec.score === 10 ? 'rgba(211, 47, 47, 0.1)' : rec.score === 20 ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                },
              ]}
            >
              <Text style={styles.tableCol}>{rec.category}</Text>
              <Text style={styles.tableCol}>{rec.checklist}</Text>
              <Text style={styles.tableCol}>{rec.code}</Text>
              <View style={styles.tableColScore}>
                <Text
                  style={{
                    color: rec.score === 10 ? '#D32F2F' : rec.score === 20 ? '#DAA520' : '#4A5568',
                  }}
                >
                  {rec.score}
                </Text>
                {rec.score === 30 && (
                  <Image
                    src="/img/checklist-green.png" // Pastikan Anda memiliki gambar checklist hijau di folder img
                    style={styles.checklistIcon}
                  />
                )}
              </View>
              <Text style={[styles.tableCol, { color: '#2B6CB0' }]}>
                {rec.recommendation}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Image src="/img/logo.png" style={styles.footerLogo} />
          <Text style={styles.footerText}>
            <Link src="https://vulnerax.com" style={styles.footerLink}>
              {t.footer.website}
            </Link>
            {' | '}
            {t.footer.reportTitle}
            {'\n'}
            {t.footer.confidential}
            {'\n'}
            {t.footer.generated(timestamp)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;