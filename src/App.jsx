import { useState } from "react";
import img from './assets/ustoz.jpg'

// --- Tarjimalar obyekti ---
const translations = {
  uz: {
    nav_about: "Haqida",
    nav_skills: "Yutuqlar",
    nav_contact: "Bog‘lanish",
    btn_murojaat: "MUROJAAT",
    hero_title: "Rustamov Sanjar Abdujamilovich",
    hero_subtitle: "Biologiya fani mutaxassisi | Pedagog",
    hero_desc: "O'zbekiston Milliy Pedagogika Universiteti bitiruvchisi. 47-sonli maktabda yoshlarga zamonaviy biologiya sirlarini o'rgatuvchi mutaxassis.",
    about_title: "Faoliyatim",
    about_list: ["47-maktab Biologiya va Ingliz tili o'qituvchisi", "Laboratoriya va tadqiqot ishlari", "Biologiya English o'qituvchisi", "Interaktiv dars metodlari"],
    skills_title: "Yo'nalishlar",
    skills_list: ["Umumiy Biologiya", "English", "Genetika", "Anatomiya", "Neyrobiologiya", "Ekologiya"],
    stat_exp: "Tajriba",
    stat_students: "O'quvchilar",
    stat_result: "Natija",
    contact_title: "Bog‘lanish",
    contact_desc: "Murojaat qoldiring, biz sizga qo'ng'iroq qilamiz.",
    placeholder_name: "Ismingiz",
    placeholder_msg: "Xabaringiz...",
    btn_send: "Yuborish",
    btn_sending: "Yuborilmoqda...",
    success_msg: "Muvaffaqiyatli yuborildi! ✔",
    err_name: "Ismingizni kiriting",
    err_phone: "9 ta raqam kiriting",
    err_message: "Xabaringizni yozing"
  },
  ru: {
    nav_about: "Обо мне",
    nav_skills: "Достижения",
    nav_contact: "Контакты",
    btn_murojaat: "СВЯЗАТЬСЯ",
    hero_title: "Рустамов Санжар Абдужамилович",
    hero_subtitle: "Специалист по биологии | Педагог",
    hero_desc: "Выпускник Национального педагогического университета Узбекистана. Специалист школы №47, обучающий молодежь секретам современной биологии.",
    about_title: "Моя деятельность",
    about_list: ["Учитель биологии и английского языка в школе №47", "Лабораторные и исследовательские работы", "Преподаватель Биологии и по  Английскому", "Интерактивные методы обучения"],
    skills_title: "Направления",
    skills_list: ["Общая биология", "Английский", "Генетика", "Анатомия", "Нейробиология", "Экология"],
    stat_exp: "Опыт",
    stat_students: "Учеников",
    stat_result: "Результат",
    contact_title: "Связаться",
    contact_desc: "Оставьте заявку, и мы вам перезвоним.",
    placeholder_name: "Ваше имя",
    placeholder_msg: "Ваше сообщение...",
    btn_send: "Отправить",
    btn_sending: "Отправка...",
    success_msg: "Успешно отправлено! ✔",
    err_name: "Введите ваше имя",
    err_phone: "Введите 9 цифр",
    err_message: "Напишите ваше сообщение"
  },
  en: {
    nav_about: "About",
    nav_skills: "Achievements",
    nav_contact: "Contact",
    btn_murojaat: "CONTACT ME",
    hero_title: "Sanjar Rustamov",
    hero_subtitle: "Biology Specialist | Educator",
    hero_desc: "Graduate of the National Pedagogical University of Uzbekistan. Specialist teaching modern biology to youth at School No. 47.",
    about_title: "My Activity",
    about_list: ["Biology and English Teacher at School 47", "Laboratory and Research works", "Biology English Educator", "Interactive teaching methods"],
    skills_title: "Specializations",
    skills_list: ["General Biology", "English", "Genetics", "Anatomy", "Neurobiology", "Ecology"],
    stat_exp: "Experience",
    stat_students: "Students",
    stat_result: "Result",
    contact_title: "Contact",
    contact_desc: "Leave a message, and I will get back to you.",
    placeholder_name: "Your Name",
    placeholder_msg: "Your Message...",
    btn_send: "Send",
    btn_sending: "Sending...",
    success_msg: "Sent successfully! ✔",
    err_name: "Enter your name",
    err_phone: "Enter 9 digits",
    err_message: "Write your message"
  }
};

export default function Portfolio() {
  const [lang, setLang] = useState("uz"); 
  const t = translations[lang];

  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_CHAT_ID;

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 9) {  
      setFormData({ ...formData, phone: value });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = t.err_name;
    if (formData.phone.length !== 9) newErrors.phone = t.err_phone;
    if (!formData.message.trim()) newErrors.message = t.err_message;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const text = `📩 *Yangi xabar!*\n\n👤 *Ism:* ${formData.name}\n📞 *Tel:* +998${formData.phone}\n📝 *Xabar:* ${formData.message}`;
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: "Markdown" }),
      });
      setSubmitted(true);
      setFormData({ name: "", phone: "", message: "" });
      setErrors({});
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      alert("Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 text-gray-900 font-sans pb-10">
      
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 px-4 md:px-6 py-4 flex justify-between items-center max-w-6xl mx-auto md:rounded-b-2xl md:mt-4">
        <div className="font-extrabold text-xl md:text-2xl text-indigo-900">Portfolio</div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex gap-4 md:gap-6 text-sm font-semibold text-gray-600 mr-4">
            <a href="#about" className="hover:text-indigo-600 transition">{t.nav_about}</a>
            <a href="#skills" className="hover:text-indigo-600 transition">{t.nav_skills}</a>
            <a href="#contact" className="hover:text-indigo-600 transition">{t.nav_contact}</a>
          </div>

          {/* Til o'zgartirgich (RU qo'shildi) */}
          <select 
            value={lang}
            onChange={(e) => setLang(e.target.value)}   
            className="bg-indigo-50 border-none outline-none text-xs font-bold text-indigo-700 p-1.5 rounded-lg cursor-pointer"
          >
            <option value="uz">UZ</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>

          <a href="#contact" className="bg-indigo-600 text-white px-4 md:px-5 py-2 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs hover:bg-indigo-700 shadow-lg transition uppercase">
            {t.btn_murojaat}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto mt-10 md:mt-20 px-6 text-center flex flex-col items-center">
        <div className="w-28 h-28 md:w-40 md:h-40 rounded-full shadow-2xl border-4 border-white overflow-hidden mb-6 bg-gray-100 flex items-center justify-center">
          <img src={img} alt="Sanjar" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-indigo-900 mb-3 tracking-tight">{t.hero_title}</h1>
        <p className="text-md md:text-lg text-indigo-600 font-medium mb-5">{t.hero_subtitle}</p>
        <p className="text-gray-600 max-w-xl text-sm md:text-base leading-relaxed">{t.hero_desc}</p>
      </header>

      {/* About Section */}
      <section id="about" className="max-w-5xl mx-auto mt-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="bg-white/80 p-6 md:p-8 rounded-3xl shadow-xl border border-white/50">
          <h2 className="text-xl md:text-2xl font-bold text-indigo-900 mb-4">{t.about_title}</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            {t.about_list.map((item, i) => (
              <li key={i} className="flex gap-2"><span>🧬</span> {item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white/80 p-6 md:p-8 rounded-3xl shadow-xl border border-white/50">
          <h2 className="text-xl md:text-2xl font-bold text-indigo-900 mb-4">{t.skills_title}</h2>
          <div className="flex flex-wrap gap-2">
            {t.skills_list.map((skill) => (
              <span key={skill} className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-[11px] md:text-xs font-bold uppercase tracking-wider">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="skills" className="max-w-5xl mx-auto mt-16 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-center">
          <div className="bg-white/80 p-5 md:p-6 rounded-3xl shadow-lg border border-white/30">
            <div className="text-2xl md:text-3xl font-extrabold text-indigo-900">4 yil</div>
            <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">{t.stat_exp}</div>
          </div>
          <div className="bg-white/80 p-5 md:p-6 rounded-3xl shadow-lg border border-white/30">
            <div className="text-2xl md:text-3xl font-extrabold text-indigo-900">500+</div>
            <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">{t.stat_students}</div>
          </div>
          <div className="bg-white/80 p-5 md:p-6 rounded-3xl shadow-lg border border-white/30 col-span-2 md:col-span-1">
            <div className="text-2xl md:text-3xl font-extrabold text-indigo-900">95%</div>
            <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">{t.stat_result}</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-xl mx-auto mt-16 px-4 mb-20">
        <div className="bg-white/90 backdrop-blur-lg p-6 md:p-8 rounded-3xl shadow-2xl border border-white">
          <h2 className="text-xl md:text-2xl font-bold text-indigo-900 mb-2">{t.contact_title}</h2>
          <p className="text-gray-500 text-[10px] md:text-xs mb-6">{t.contact_desc}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder={t.placeholder_name}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full p-3.5 bg-gray-50 border rounded-2xl outline-none text-sm ${errors.name ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-indigo-500'}`}
            />
            {errors.name && <p className="text-red-500 text-[10px] ml-2">{errors.name}</p>}

            <div className={`flex items-center bg-gray-50 border rounded-2xl overflow-hidden ${errors.phone ? 'border-red-500' : 'border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500'}`}>
              <span className="pl-4 text-sm text-gray-500 font-semibold">+998</span>
              <input
                type="text"
                placeholder="XX XXX XX XX"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="w-full p-3.5 bg-transparent outline-none text-sm"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-[10px] ml-2">{errors.phone}</p>}

            <textarea
              placeholder={t.placeholder_msg}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full p-3.5 bg-gray-50 border rounded-2xl h-24 md:h-28 resize-none outline-none text-sm ${errors.message ? 'border-red-500' : 'border-gray-200 focus:ring-2 focus:ring-indigo-500'}`}
            />
            {errors.message && <p className="text-red-500 text-[10px] ml-2">{errors.message}</p>}

            <button type="submit" disabled={loading} className="w-full bg-indigo-900 text-white p-4 rounded-2xl font-bold shadow-xl hover:bg-indigo-950 transition active:scale-95 text-sm uppercase">
              {loading ? t.btn_sending : t.btn_send}
            </button>
            
            {submitted && <p className="text-emerald-600 text-xs text-center font-bold mt-2 animate-bounce">{t.success_msg}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}













