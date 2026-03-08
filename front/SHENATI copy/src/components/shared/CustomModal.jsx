import { Button } from "@/components/ui/button";

export default function CustomModal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="bg-white border-b px-6 py-4 flex justify-between items-center text-slate-900">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-900 text-2xl transition-colors"
                    >
                        &times;
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
