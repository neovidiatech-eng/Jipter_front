import { useState, useRef } from 'react';
import {
  Building2, Palette, Search, Share2, Phone, Globe, Save, RotateCcw,
  Upload, X, Check, ChevronRight, Monitor, Type, Image,
  Facebook, Instagram, Youtube, Send, Linkedin, MessageCircle, Twitter
} from 'lucide-react';
import { useSettings, SocialLink } from '../../../contexts/SettingsContext';

const fontOptions = [
  { value: 'Almarai', label: 'Almarai', preview: 'الخط الافتراضي' },
  { value: 'Cairo', label: 'Cairo', preview: 'خط القاهرة' },
  { value: 'Tajawal', label: 'Tajawal', preview: 'خط تجوال' },
  { value: 'Noto Kufi Arabic', label: 'Noto Kufi Arabic', preview: 'خط كوفي' },
  { value: 'IBM Plex Sans Arabic', label: 'IBM Plex', preview: 'خط IBM' },
];

const colorPresets = [
  { name: 'أزرق', primary: '#2563eb', accent: '#06b6d4' },
  { name: 'أخضر', primary: '#16a34a', accent: '#0d9488' },
  { name: 'أحمر', primary: '#dc2626', accent: '#ea580c' },
  { name: 'رمادي', primary: '#374151', accent: '#6b7280' },
  { name: 'بني', primary: '#92400e', accent: '#b45309' },
  { name: 'وردي', primary: '#db2777', accent: '#e11d48' },
];

const socialPlatforms: { platform: SocialLink['platform']; label: string; placeholder: string; icon: any; color: string }[] = [
  { platform: 'whatsapp', label: 'WhatsApp', placeholder: '+966501234567', icon: MessageCircle, color: '#25d366' },
  { platform: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...', icon: Facebook, color: '#1877f2' },
  { platform: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...', icon: Instagram, color: '#e1306c' },
  { platform: 'twitter', label: 'X (Twitter)', placeholder: 'https://x.com/...', icon: Twitter, color: '#000000' },
  { platform: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/...', icon: Youtube, color: '#ff0000' },
  { platform: 'tiktok', label: 'TikTok', placeholder: 'https://tiktok.com/@...', icon: Monitor, color: '#010101' },
  { platform: 'telegram', label: 'Telegram', placeholder: 'https://t.me/...', icon: Send, color: '#0088cc' },
  { platform: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/...', icon: Linkedin, color: '#0077b5' },
];

type Tab = 'general' | 'appearance' | 'seo' | 'social' | 'contact';

const tabs: { id: Tab; label: string; icon: any }[] = [
  { id: 'general', label: 'عام', icon: Building2 },
  { id: 'appearance', label: 'المظهر', icon: Palette },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'social', label: 'التواصل', icon: Share2 },
  { id: 'contact', label: 'التواصل معنا', icon: Phone },
];

export default function SettingsPage() {
  const { settings, updateSettings, updateSeo, updateSocialLink, resetSettings } = useSettings();
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [saved, setSaved] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const ogImageInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateSettings({ logoUrl: url });
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateSettings({ faviconUrl: url });
  };

  const handleOgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateSeo({ ogImage: url });
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">الإعدادات</h1>
          <p className="text-gray-500 text-sm mt-1">تخصيص المنصة وضبط إعداداتها</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetSettings}
            className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            إعادة تعيين
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm text-white ${saved ? 'bg-green-600' : ''}`}
            style={!saved ? { backgroundColor: settings.primaryColor } : {}}
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'تم الحفظ' : 'حفظ التغييرات'}
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 space-y-1 sticky top-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-right ${
                  activeTab === tab.id ? '' : 'text-gray-600 hover:bg-gray-50'
                }`}
                style={activeTab === tab.id ? { backgroundColor: settings.primaryColor + '15', color: settings.primaryColor } : {}}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">{tab.label}</span>
                {activeTab === tab.id && <ChevronRight className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-5">
              <SectionCard title="هوية المنصة" icon={Building2} primaryColor={settings.primaryColor}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Logo */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3 text-right">شعار المنصة (Logo)</label>
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => logoInputRef.current?.click()}
                        className="w-24 h-24 border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-2xl flex items-center justify-center cursor-pointer transition-colors overflow-hidden bg-gray-50"
                      >
                        {settings.logoUrl ? (
                          <img src={settings.logoUrl} alt="logo" className="w-full h-full object-contain p-1" />
                        ) : (
                          <div className="text-center">
                            <Image className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                            <span className="text-xs text-gray-400">رفع</span>
                          </div>
                        )}
                      </div>
                      <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                      <div className="flex-1">
                        <button
                          onClick={() => logoInputRef.current?.click()}
                          className="flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          رفع شعار
                        </button>
                        {settings.logoUrl && (
                          <button
                            onClick={() => updateSettings({ logoUrl: '' })}
                            className="flex items-center gap-1.5 text-red-500 hover:text-red-700 text-xs mt-2 transition-colors"
                          >
                            <X className="w-3 h-3" />
                            حذف الشعار
                          </button>
                        )}
                        <p className="text-xs text-gray-400 mt-2">PNG, JPG, SVG - الحجم المقترح 200×200px</p>
                      </div>
                    </div>
                  </div>

                  {/* Favicon */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">Favicon</label>
                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => faviconInputRef.current?.click()}
                        className="w-12 h-12 border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl flex items-center justify-center cursor-pointer transition-colors overflow-hidden bg-gray-50 flex-shrink-0"
                      >
                        {settings.faviconUrl ? (
                          <img src={settings.faviconUrl} alt="favicon" className="w-full h-full object-contain" />
                        ) : (
                          <Globe className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <input ref={faviconInputRef} type="file" accept="image/*" className="hidden" onChange={handleFaviconUpload} />
                      <button
                        onClick={() => faviconInputRef.current?.click()}
                        className="text-xs transition-colors"
                        style={{ color: settings.primaryColor }}
                      >
                        رفع Favicon
                      </button>
                    </div>
                  </div>

                  <FieldGroup label="اسم المنصة" required>
                    <input
                      type="text"
                      value={settings.name}
                      onChange={e => updateSettings({ name: e.target.value })}
                      className={inputCls}
                      placeholder="اسم منصتك"
                    />
                  </FieldGroup>

                  <div className="md:col-span-2">
                    <FieldGroup label="وصف المنصة">
                      <textarea
                        rows={3}
                        value={settings.description}
                        onChange={e => updateSettings({ description: e.target.value })}
                        className={inputCls + ' resize-none'}
                        placeholder="وصف مختصر عن منصتك"
                      />
                    </FieldGroup>
                  </div>

                  <FieldGroup label="العملة الافتراضية">
                    <select value={settings.currency} onChange={e => updateSettings({ currency: e.target.value })} className={inputCls + ' bg-white'}>
                      <option value="SAR">ريال سعودي (SAR)</option>
                      <option value="AED">درهم إماراتي (AED)</option>
                      <option value="EGP">جنيه مصري (EGP)</option>
                      <option value="KWD">دينار كويتي (KWD)</option>
                      <option value="USD">دولار أمريكي (USD)</option>
                      <option value="EUR">يورو (EUR)</option>
                    </select>
                  </FieldGroup>

                  <FieldGroup label="المنطقة الزمنية">
                    <select value={settings.timezone} onChange={e => updateSettings({ timezone: e.target.value })} className={inputCls + ' bg-white'}>
                      <option value="Asia/Riyadh">الرياض (GMT+3)</option>
                      <option value="Asia/Dubai">دبي (GMT+4)</option>
                      <option value="Africa/Cairo">القاهرة (GMT+2)</option>
                      <option value="Asia/Kuwait">الكويت (GMT+3)</option>
                      <option value="Europe/London">لندن (GMT+0)</option>
                    </select>
                  </FieldGroup>
                </div>
              </SectionCard>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-5">
              <SectionCard title="الألوان" icon={Palette} primaryColor={settings.primaryColor}>
                <div className="space-y-5">
                  <div>
                    <p className="text-sm text-gray-500 text-right mb-3">قوالب جاهزة</p>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {colorPresets.map(preset => (
                        <button
                          key={preset.name}
                          onClick={() => updateSettings({ primaryColor: preset.primary, accentColor: preset.accent })}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                            settings.primaryColor === preset.primary ? 'border-gray-400 shadow-md' : 'border-transparent hover:border-gray-200'
                          }`}
                        >
                          <div className="flex gap-1">
                            <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: preset.primary }} />
                            <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: preset.accent }} />
                          </div>
                          <span className="text-xs text-gray-600 font-medium">{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-500 text-right mb-3">تخصيص يدوي</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <ColorPickerField
                        label="اللون الرئيسي"
                        value={settings.primaryColor}
                        onChange={v => updateSettings({ primaryColor: v })}
                      />
                      <ColorPickerField
                        label="اللون الثانوي"
                        value={settings.secondaryColor}
                        onChange={v => updateSettings({ secondaryColor: v })}
                      />
                      <ColorPickerField
                        label="لون التمييز"
                        value={settings.accentColor}
                        onChange={v => updateSettings({ accentColor: v })}
                      />
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-500 text-right mb-3">معاينة مباشرة</p>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex gap-2 flex-wrap">
                        <button className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm" style={{ backgroundColor: settings.primaryColor }}>
                          زرار رئيسي
                        </button>
                        <button className="px-4 py-2 rounded-lg text-sm font-medium border-2" style={{ borderColor: settings.primaryColor, color: settings.primaryColor }}>
                          زرار ثانوي
                        </button>
                        <span className="px-3 py-1.5 rounded-full text-white text-xs font-medium" style={{ backgroundColor: settings.accentColor }}>
                          بادج
                        </span>
                      </div>
                      <div className="h-2 rounded-full" style={{ backgroundColor: settings.primaryColor + '30' }}>
                        <div className="h-2 rounded-full w-2/3 transition-all" style={{ backgroundColor: settings.primaryColor }} />
                      </div>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="الخط" icon={Type} primaryColor={settings.primaryColor}>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 text-right">اختر الخط المناسب للمنصة</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fontOptions.map(font => (
                      <button
                        key={font.value}
                        onClick={() => updateSettings({ fontFamily: font.value })}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all text-right ${
                          settings.fontFamily === font.value
                            ? ''
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        style={settings.fontFamily === font.value ? { borderColor: settings.primaryColor, backgroundColor: settings.primaryColor + '10' } : {}}
                      >
                        <div className="flex items-center gap-2">
                          {settings.fontFamily === font.value && (
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: settings.primaryColor }}>
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-800">{font.label}</p>
                          <p className="text-xs text-gray-500">{font.preview}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="space-y-5">
              <SectionCard title="إعدادات SEO" icon={Search} primaryColor={settings.primaryColor}>
                <div className="space-y-4">
                  <FieldGroup label="عنوان الصفحة (Meta Title)" hint="يُعرض في نتائج البحث وتبويبات المتصفح">
                    <input
                      type="text"
                      value={settings.seo.metaTitle}
                      onChange={e => updateSeo({ metaTitle: e.target.value })}
                      className={inputCls}
                      placeholder="اسم منصتك - وصف مختصر"
                      maxLength={70}
                    />
                    <CharCounter current={settings.seo.metaTitle.length} max={70} />
                  </FieldGroup>

                  <FieldGroup label="وصف الصفحة (Meta Description)" hint="يُعرض تحت العنوان في نتائج البحث">
                    <textarea
                      rows={3}
                      value={settings.seo.metaDescription}
                      onChange={e => updateSeo({ metaDescription: e.target.value })}
                      className={inputCls + ' resize-none'}
                      placeholder="وصف مختصر وجذاب للمنصة..."
                      maxLength={160}
                    />
                    <CharCounter current={settings.seo.metaDescription.length} max={160} />
                  </FieldGroup>

                  <FieldGroup label="الكلمات المفتاحية (Keywords)" hint="افصل بين الكلمات بفاصلة">
                    <input
                      type="text"
                      value={settings.seo.keywords}
                      onChange={e => updateSeo({ keywords: e.target.value })}
                      className={inputCls}
                      placeholder="تعليم, كورسات, طلاب, ..."
                    />
                  </FieldGroup>

                  <FieldGroup label="صورة المشاركة (OG Image)" hint="تُعرض عند مشاركة الرابط على السوشيال ميديا - الحجم المثالي 1200×630px">
                    <div
                      onClick={() => ogImageInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl overflow-hidden cursor-pointer transition-colors"
                    >
                      {settings.seo.ogImage ? (
                        <div className="relative h-40">
                          <img src={settings.seo.ogImage} alt="OG" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <p className="text-white text-sm font-medium">تغيير الصورة</p>
                          </div>
                        </div>
                      ) : (
                        <div className="h-32 flex flex-col items-center justify-center gap-2 text-gray-400">
                          <Upload className="w-6 h-6" />
                          <p className="text-sm">رفع صورة المشاركة</p>
                          <p className="text-xs text-gray-300">1200×630px مقترح</p>
                        </div>
                      )}
                    </div>
                    <input ref={ogImageInputRef} type="file" accept="image/*" className="hidden" onChange={handleOgImageUpload} />
                    {settings.seo.ogImage && (
                      <button onClick={() => updateSeo({ ogImage: '' })} className="text-xs text-red-500 hover:text-red-700 mt-1 transition-colors">حذف الصورة</button>
                    )}
                  </FieldGroup>

                  <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() => updateSeo({ robotsIndex: !settings.seo.robotsIndex })}
                        className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative ${settings.seo.robotsIndex ? '' : 'bg-gray-300'}`}
                        style={settings.seo.robotsIndex ? { backgroundColor: settings.primaryColor } : {}}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${settings.seo.robotsIndex ? 'left-7' : 'left-1'}`} />
                      </div>
                      <span className="text-sm text-gray-500">{settings.seo.robotsIndex ? 'مفعّل' : 'معطّل'}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">السماح لمحركات البحث بالفهرسة</p>
                      <p className="text-xs text-gray-500">robots: index, follow</p>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Preview */}
              <SectionCard title="معاينة نتيجة البحث" icon={Globe} primaryColor={settings.primaryColor}>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 max-w-lg">
                    <p className="text-xs text-gray-400 mb-1">example.com</p>
                    <p className="text-base font-medium line-clamp-1" style={{ color: settings.primaryColor }}>
                      {settings.seo.metaTitle || settings.name}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                      {settings.seo.metaDescription || settings.description || 'وصف الصفحة سيظهر هنا...'}
                    </p>
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <SectionCard title="روابط السوشيال ميديا" icon={Share2} primaryColor={settings.primaryColor}>
              <div className="space-y-3">
                {socialPlatforms.map(({ platform, label, placeholder, icon: Icon, color }) => {
                  const link = settings.socialLinks.find(l => l.platform === platform);
                  return (
                    <div key={platform} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${link?.enabled ? 'border-gray-200 bg-white shadow-sm' : 'border-gray-100 bg-gray-50'}`}>
                      <div
                        onClick={() => updateSocialLink(platform, { enabled: !link?.enabled })}
                        className={`w-10 h-6 rounded-full cursor-pointer transition-colors relative flex-shrink-0 ${link?.enabled ? '' : 'bg-gray-300'}`}
                        style={link?.enabled ? { backgroundColor: settings.primaryColor } : {}}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${link?.enabled ? 'left-5' : 'left-1'}`} />
                      </div>
                      <input
                        type="text"
                        value={link?.value || ''}
                        onChange={e => updateSocialLink(platform, { value: e.target.value, enabled: true })}
                        className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        placeholder={placeholder}
                        dir="ltr"
                        disabled={!link?.enabled}
                      />
                      <div className="flex items-center gap-2 flex-shrink-0 w-28 justify-end">
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '20' }}>
                          <Icon className="w-4 h-4" style={{ color }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <SectionCard title="معلومات التواصل" icon={Phone} primaryColor={settings.primaryColor}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldGroup label="رقم الواتساب" hint="سيظهر كزرار تواصل في المنصة">
                  <div className="relative">
                    <MessageCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={e => updateSettings({ whatsappNumber: e.target.value })}
                      className={inputCls + ' pr-10'}
                      placeholder="+966501234567"
                      dir="ltr"
                    />
                  </div>
                </FieldGroup>

                <FieldGroup label="البريد الإلكتروني">
                  <input
                    type="email"
                    value={settings.email}
                    onChange={e => updateSettings({ email: e.target.value })}
                    className={inputCls}
                    placeholder="info@example.com"
                    dir="ltr"
                  />
                </FieldGroup>

                <FieldGroup label="رقم الهاتف">
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={e => updateSettings({ phone: e.target.value })}
                    className={inputCls}
                    placeholder="+966501234567"
                    dir="ltr"
                  />
                </FieldGroup>

                <FieldGroup label="العنوان">
                  <input
                    type="text"
                    value={settings.address}
                    onChange={e => updateSettings({ address: e.target.value })}
                    className={inputCls}
                    placeholder="المدينة، المملكة العربية السعودية"
                  />
                </FieldGroup>

                {/* Whatsapp Preview */}
                {settings.whatsappNumber && (
                  <div className="md:col-span-2">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-sm font-medium text-green-800 text-right mb-2">معاينة زرار الواتساب</p>
                      <a
                        href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        تواصل عبر واتساب
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right';

function SectionCard({ title, icon: Icon, children, primaryColor }: { title: string; icon: any; children: React.ReactNode; primaryColor?: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="p-2 rounded-lg" style={{ backgroundColor: (primaryColor || '#2563eb') + '15' }}>
          <Icon className="w-4 h-4" style={{ color: primaryColor || '#2563eb' }} />
        </div>
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function FieldGroup({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5 text-right">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1 text-right">{hint}</p>}
    </div>
  );
}

function ColorPickerField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 text-right">{label}</label>
      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white">
        <span className="text-sm text-gray-600 flex-1 font-mono" dir="ltr">{value}</span>
        <div className="relative">
          <div className="w-8 h-8 rounded-lg shadow-sm border border-gray-200 cursor-pointer" style={{ backgroundColor: value }} />
          <input
            type="color"
            value={value}
            onChange={e => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

function CharCounter({ current, max }: { current: number; max: number }) {
  const pct = current / max;
  return (
    <div className="flex items-center justify-between mt-1">
      <div className="h-1 flex-1 ml-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-1 rounded-full transition-all ${pct > 0.9 ? 'bg-red-500' : pct > 0.7 ? 'bg-yellow-500' : 'bg-green-500'}`}
          style={{ width: `${Math.min(100, pct * 100)}%` }}
        />
      </div>
      <span className={`text-xs ${pct > 0.9 ? 'text-red-500' : 'text-gray-400'}`}>{current}/{max}</span>
    </div>
  );
}
