import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getRoleSchema, RoleFormData } from '../../lib/schemas/RoleSchema';
import { useEffect } from 'react';

interface AddRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: RoleFormData) => void;
    initialData?: RoleFormData | null; // 👈 edit support
    isLoading?: boolean;
}

export default function AddRoleModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isLoading,
}: AddRoleModalProps) {
    const { t } = useTranslation();

    const isEdit = !!initialData;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RoleFormData>({
        resolver: zodResolver(getRoleSchema(t)),
        defaultValues: {
            name: '',
        },
    });

    // 🔥 fill data when editing
    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({ name: '' });
        }
    }, [initialData, reset]);

    const handleClose = () => {
        reset();
        onClose();
    };

    const onFormSubmit = (data: RoleFormData) => {
        onSubmit(data);
        reset();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">

                {/* Header */}
                <div className="p-6 flex justify-between items-center bg-primary text-white">
                    <h2 className="text-xl font-bold">
                        {isEdit ? t('editRole') : t('addNewRole')}
                    </h2>

                    <button onClick={handleClose}>
                        <X />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onFormSubmit)}
                    className="p-6 space-y-6 text-start"
                >
                    {/* Role Name */}
                    <div>
                        <label className="block mb-2 font-medium">
                            {t('roleName')}
                        </label>

                        <input
                            {...register('name')}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'
                                }`}
                            placeholder={t('roleName')}
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 btn-primary text-white py-3 rounded-xl font-bold"
                        >
                            {isLoading
                                ? t('saving')
                                : isEdit
                                    ? t('update')
                                    : t('add')}
                        </button>

                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-3 border rounded-xl"
                        >
                            {t('cancel')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
