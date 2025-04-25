import { create } from 'zustand';

const useTestStore = create((set) => ({
    // Data perusahaan
    companyData: {
        fullName: '',
        firstName: '',
        lastName: '',
        companyEmail: '',
        companyName: '',
        isPaid: true,
    },
    companyId: null, 
    apiKey: null, 
    isCompanyDataSet: false, 

    setCompanyData: (data) => set((state) => ({
        companyData: { ...state.companyData, ...data },
    })),

    setCompanyId: (id) => set({ companyId: id }),

    setApiKey: (key) => set({ apiKey: key }), 

    setIsCompanyDataSet: (value) => set({ isCompanyDataSet: value }),

    scores: {},
    answeredQuestions: {},

    // Fungsi untuk menyimpan skor dan menandai pertanyaan yang telah dijawab
    setScore: (code, value) =>
        set((state) => ({
            scores: { ...state.scores, [code]: value },
            answeredQuestions: { ...state.answeredQuestions, [code]: true },
        })),

    // Fungsi untuk mereset store ke kondisi awal
    resetStore: () => set({
        scores: {},
        answeredQuestions: {},
        companyData: {
            fullName: '',
            firstName: '',
            lastName: '',
            companyEmail: '',
            companyName: '',
            isPaid: true,
        },
        companyId: null,
        apiKey: null, // Reset apiKey
        isCompanyDataSet: false,
    }),
}));

export default useTestStore;