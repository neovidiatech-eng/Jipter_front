import { Modal, Upload as AntUpload, Input, Select, Button, Tag } from 'antd';
import { Upload as UploadIcon, X, Plus } from 'lucide-react';

const { Dragger } = AntUpload;

interface UploadContentModalProps {
  open: boolean;
  onCancel: () => void;
}

export default function UploadContentModal({ open, onCancel }: UploadContentModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={550}
      closeIcon={
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all">
          <X size={18} />
        </div>
      }
      className="upload-modal-v2"
      title={<span className="text-lg font-bold text-gray-800">Upload Content</span>}
    >
      <div className="pt-2 space-y-5">
        
        {/* Upload Area */}
        <Dragger 
          className="upload-dragger-v2 !bg-[#F8FAFF] !border-dashed !border-[#E0E7FF] !rounded-2xl hover:!border-indigo-400 transition-all"
          multiple={false}
        >
          <div className="py-6">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-indigo-500 mx-auto mb-3 shadow-sm">
               <UploadIcon size={24} />
            </div>
            <p className="text-sm font-bold text-gray-800">Click to <span className="text-indigo-600">upload</span> or drag and drop</p>
            <p className="text-[11px] font-bold text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
        </Dragger>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Content Title</label>
            <Input 
              placeholder="e.g. Introduction to Design" 
              className="h-11 rounded-xl border-gray-300 text-sm font-medium"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Content Type</label>
            <Select 
              defaultValue="video"
              className="w-full h-11 rounded-xl"
              options={[
                { value: 'video', label: 'Video File' },
                { value: 'pdf', label: 'PDF Document' },
                { value: 'image', label: 'Image' },
              ]}
            />
          </div>
        </div>

        {/* Assign to Level */}
        <div className="space-y-3">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Assign to Level</label>
          <div className="flex flex-wrap gap-2">
            <Tag className="px-4 py-1.5 rounded-full border-none bg-indigo-600 text-white text-[11px] font-bold cursor-pointer hover:opacity-90 transition-all">
              Grade 10 Biology
            </Tag>
            <Tag className="px-4 py-1.5 rounded-full border-none bg-indigo-50 text-[11px] font-bold cursor-pointer hover:bg-indigo-100 transition-all">
              Grade 11 Chemistry
            </Tag>
            <Tag className="px-4 py-1.5 rounded-full border-none bg-indigo-50 text-[11px] font-bold cursor-pointer hover:bg-indigo-100 transition-all">
              AP Science
            </Tag>
            <button className="px-4 py-1.5 rounded-full border border-dashed border-gray-200 text-gray-400 text-[11px] font-bold hover:border-indigo-300 hover:text-indigo-400 transition-all flex items-center gap-1">
              <Plus size={12} /> Add Level
            </button>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button 
            type="text" 
            className="h-11 px-6 font-bold text-gray-400 hover:text-gray-600"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="primary" 
            className="h-11 px-8 rounded-xl font-bold bg-[#4F46E5] hover:!bg-[#3e37bc] shadow-md shadow-indigo-100"
          >
            Upload & Save
          </Button>
        </div>

      </div>

      <style>{`
        .upload-modal-v2 .ant-modal-content {
          border-radius: 24px !important;
          padding: 24px 32px !important;
        }
        .upload-modal-v2 .ant-modal-header {
          margin-bottom: 16px !important;
          border-bottom: none !important;
        }
        .upload-modal-v2 .ant-select-selector {
          border-radius: 12px !important;
          background-color: #F9FAFB !important;
          border-color: #F1F5F9 !important;
          height: 44px !important;
          padding: 6px 12px !important;
        }
        .upload-modal-v2 .ant-input {
          background-color: #F9FAFB !important;
        }
      `}</style>
    </Modal>
  );
}
