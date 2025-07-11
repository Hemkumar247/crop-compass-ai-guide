import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        weather: "Weather",
        crops: "Crops",
        analytics: "Analytics",
        calendar: "Calendar"
      },
      app: {
        name: "Rakshak",
        tagline: "Smart Farming AI Guide"
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: "होम",
        weather: "मौसम",
        crops: "फसलें",
        analytics: "विश्लेषण",
        calendar: "कैलेंडर"
      },
      app: {
        name: "रक्षक",
        tagline: "स्मार्ट फार्मिंग AI गाइड"
      }
    }
  },
  ta: {
    translation: {
      nav: {
        home: "முகப்பு",
        weather: "வானிலை",
        crops: "பயிர்கள்",
        analytics: "பகுப்பாய்வு",
        calendar: "நாட்காட்டி"
      },
      app: {
        name: "ரக்ஷக்",
        tagline: "ஸ்மார்ட் பார்மிங் AI வழிகாட்டி"
      }
    }
  },
  te: {
    translation: {
      nav: {
        home: "హోమ్",
        weather: "వాతావరణం",
        crops: "పంటలు",
        analytics: "విశ్లేషణ",
        calendar: "క్యాలెండర్"
      },
      app: {
        name: "రక్షక్",
        tagline: "స్మార్ట్ ఫార్మింగ్ AI గైడ్"
      }
    }
  },
  kn: {
    translation: {
      nav: {
        home: "ಮುಖಪುಟ",
        weather: "ಹವಾಮಾನ",
        crops: "ಬೆಳೆಗಳು",
        analytics: "ವಿಶ್ಲೇಷಣೆ",
        calendar: "ಕ್ಯಾಲೆಂಡರ್"
      },
      app: {
        name: "ರಕ್ಷಕ್",
        tagline: "ಸ್ಮಾರ್ಟ್ ಫಾರ್ಮಿಂಗ್ AI ಗೈಡ್"
      }
    }
  },
  bn: {
    translation: {
      nav: {
        home: "হোম",
        weather: "আবহাওয়া",
        crops: "ফসল",
        analytics: "বিশ্লেষণ",
        calendar: "ক্যালেন্ডার"
      },
      app: {
        name: "রক্ষক",
        tagline: "স্মার্ট ফার্মিং AI গাইড"
      }
    }
  },
  gu: {
    translation: {
      nav: {
        home: "હોમ",
        weather: "હવામાન",
        crops: "પાક",
        analytics: "વિશ્લેષણ",
        calendar: "કેલેન્ડર"
      },
      app: {
        name: "રક્ષક",
        tagline: "સ્માર્ટ ફાર્મિંગ AI ગાઇડ"
      }
    }
  },
  mr: {
    translation: {
      nav: {
        home: "मुख्यपृष्ठ",
        weather: "हवामान",
        crops: "पिके",
        analytics: "विश्लेषण",
        calendar: "दिनदर्शिका"
      },
      app: {
        name: "रक्षक",
        tagline: "स्मार्ट फार्मिंग AI मार्गदर्शक"
      }
    }
  },
  pa: {
    translation: {
      nav: {
        home: "ਘਰ",
        weather: "ਮੌਸਮ",
        crops: "ਫ਼ਸਲਾਂ",
        analytics: "ਵਿਸ਼ਲੇਸ਼ਣ",
        calendar: "ਕੈਲੰਡਰ"
      },
      app: {
        name: "ਰਕ੍ਸ਼ਕ",
        tagline: "ਸਮਾਰਟ ਫਾਰਮਿੰਗ AI ਗਾਈਡ"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;