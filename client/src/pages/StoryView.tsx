import { useRoute } from "wouter";
import { useEffect } from "react";
import { AppData } from "@/types";
import data from "@/data/seerah.json";
import Layout from "@/components/Layout";
import Quiz from "@/components/Quiz";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Share2, Quote, BookOpen, PlayCircle, Volume2, VolumeX, ArrowLeft, Globe, Library } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const appData = data as unknown as AppData;

export default function StoryView() {
  const [match, params] = useRoute("/story/:id");
  const storyId = params ? parseInt(params.id) : null;
  const story = appData.stories.find((s) => s.id === storyId);
  const { t, i18n } = useTranslation();
  const { speak, stop, isSpeaking, supported } = useTextToSpeech();
  const { toast } = useToast();

  useEffect(() => {
    if (!story) return;
    const storyTitle =
      i18n.language === "en" ? story.title_en || story.title :
      i18n.language === "fr" ? story.title_fr || story.title :
      story.title;
    document.title = `${storyTitle} | السيرة النبوية الشريفة`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const content =
        i18n.language === "en" ? story.content_en || story.content :
        i18n.language === "fr" ? story.content_fr || story.content :
        story.content;
      metaDesc.setAttribute("content", content.slice(0, 160));
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", `${storyTitle} | السيرة النبوية الشريفة`);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", window.location.href);
    return () => {
      document.title = "السيرة النبوية الشريفة | تطبيق تعليمي عن حياة النبي محمد ﷺ";
    };
  }, [story, i18n.language]);

  const handleShare = () => {
    const url = window.location.href;
    const storyTitle = story
      ? (i18n.language === 'en' ? story.title_en || story.title :
         i18n.language === 'fr' ? story.title_fr || story.title :
         story.title)
      : t('app_title');
    if (navigator.share) {
      navigator.share({ title: storyTitle, text: `${storyTitle} — ${t('app_title')}`, url }).catch(() => {
        navigator.clipboard.writeText(url);
        toast({ title: "تم النسخ", description: "تم نسخ الرابط!" });
      });
    } else {
      navigator.clipboard.writeText(url);
      toast({ title: "تم النسخ", description: "تم نسخ الرابط!" });
    }
  };

  if (!story) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">{t('story_not_found')}</h2>
          <Link href="/" asChild>
            <Button>{t('back_home')}</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const title = i18n.language === 'en' ? story.title_en || story.title : 
                i18n.language === 'fr' ? story.title_fr || story.title : 
                story.title;
                
  const content = i18n.language === 'en' ? story.content_en || story.content :
                  i18n.language === 'fr' ? story.content_fr || story.content :
                  story.content;

  const values = i18n.language === 'en' ? story.values_en || story.values :
                 i18n.language === 'fr' ? story.values_fr || story.values :
                 story.values;

  const handleSpeak = (langOverride?: string) => {
    if (isSpeaking) {
      stop();
    } else {
      // Determine language for speech synthesis
      const lang = langOverride || (i18n.language === 'en' ? 'en-US' : 
                   i18n.language === 'fr' ? 'fr-FR' : 
                   'ar-SA');
      
      const textToRead = lang === 'ar-SA' 
        ? `${story.title}. ${story.content}` // Always read Arabic source if Arabic selected
        : `${title}. ${content}`;

      speak(textToRead, lang); 
    }
  };

  // Helper to parse YouTube URL
  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        let params = '';
        
        if (url.includes('v=')) {
          videoId = url.split('v=')[1]?.split('&')[0];
          const queryParams = url.split('?')[1];
          if (queryParams) {
            const searchParams = new URLSearchParams(queryParams);
            const t = searchParams.get('t');
            if (t) params = `?start=${t.replace('s', '')}`;
          }
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1]?.split('?')[0];
        }
        
        if (videoId) return `https://www.youtube.com/embed/${videoId}${params}`;
      } else if (url.includes('archive.org/details/')) {
        return url.replace('details/', 'embed/');
      }
    } catch (e) {
      console.error("Error parsing video URL", e);
    }
    return url;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            {t('home')}
          </Link>
          {i18n.language === 'ar' ? <ChevronRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4 rotate-180" />}
          <span>{story.category}</span>
          {i18n.language === 'ar' ? <ChevronRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4 rotate-180" />}
          <span className="text-foreground font-medium">{title}</span>
        </div>

        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                {story.category}
              </Badge>
              <h1 className={cn("text-3xl md:text-5xl font-bold leading-tight text-foreground", i18n.language === 'ar' ? "font-arabic" : "font-sans")}>
                {title}
              </h1>
            </div>
            <div className="flex gap-2 shrink-0">
               {supported && (
                 <>
                  {/* Main Listen Button (Current Language) */}
                  <Button 
                    variant={isSpeaking ? "secondary" : "outline"} 
                    size="icon" 
                    onClick={() => handleSpeak()}
                    title={isSpeaking ? t('stop_listening') : t('listen')}
                  >
                    {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  
                  {/* Arabic Listen Button (Visible if not in Arabic) */}
                  {i18n.language !== 'ar' && (
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleSpeak('ar-SA')}
                      title="Listen in Arabic"
                      className="font-arabic"
                    >
                      <span className="text-xs font-bold">ع</span>
                    </Button>
                  )}
                 </>
              )}
              <Button variant="outline" size="icon" onClick={handleShare} title={t('share_score')}>
                <Share2 className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content & Values */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Main Content */}
            <div className={cn("prose prose-lg dark:prose-invert max-w-none leading-loose text-foreground/90", i18n.language === 'ar' ? "font-arabic" : "font-sans")}>
              <p className="text-xl whitespace-pre-line">{content}</p>
            </div>
            
            {/* Added Footer Message After Story Content */}
            <div className="flex justify-center my-8">
               <div className="flex items-center gap-2 text-primary/70 font-medium px-6 py-3 bg-primary/5 rounded-full border border-primary/10">
                 <span className="text-red-500 animate-pulse">❤</span>
                 <span className={i18n.language === 'ar' ? "font-arabic" : "font-sans"}>{t('made_with_love')}</span>
              </div>
            </div>

            {/* Hadith Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#faf9f6] border-2 border-[#d4af37]/30 rounded-tl-3xl rounded-br-3xl p-8 relative overflow-hidden shadow-md"
            >
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#d4af37]/20 rounded-tl-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#d4af37]/20 rounded-br-3xl pointer-events-none"></div>
              
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#d4af37]/10 rotate-180" />
              
              <div className="relative z-10 space-y-6">
                <p className="text-xl md:text-3xl font-arabic text-center leading-relaxed text-[#2c3e50] font-medium drop-shadow-sm" dir="rtl">
                  "{story.hadith.text}"
                </p>
                <div className="flex justify-center items-center gap-2 text-sm text-[#8c7b50]" dir="rtl">
                  <div className="h-px w-12 bg-[#d4af37]/40"></div>
                  <span className="font-bold">{story.hadith.source}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                  <span>{story.hadith.reference}</span>
                  <div className="h-px w-12 bg-[#d4af37]/40"></div>
                </div>
              </div>
            </motion.div>

            {/* Video Section */}
            {story.videos && (
              (() => {
                const currentLang = i18n.language as 'en' | 'fr' | 'ar';
                // Try current language, fallback to English, then any available
                const video = story.videos[currentLang] || story.videos['en'] || Object.values(story.videos)[0];
                
                if (!video) return null;

                const embedUrl = getEmbedUrl(video.url);

                return (
                  <div className="space-y-4">
                    <h3 className={cn("text-xl font-bold flex items-center gap-2", i18n.language === 'ar' ? "font-arabic" : "font-sans")}>
                      <PlayCircle className="w-6 h-6 text-primary" />
                      {t('watch_video')}
                    </h3>
                    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-border/50">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={embedUrl}
                        title={video.title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                );
              })()
            )}
            
             {/* Quiz Section */}
             <div className="pt-8">
               <Quiz questions={story.questions} />
             </div>

             {/* Sources Section — full width below quiz */}
             {story.sources && story.sources.length > 0 && (
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="pt-4"
               >
                 <div className="bg-amber-50/60 dark:bg-amber-950/10 rounded-xl border border-amber-200/60 dark:border-amber-900/30 p-6">
                   <h3 className={cn("text-lg font-bold mb-5 flex items-center gap-2 text-amber-800 dark:text-amber-400", i18n.language === 'ar' ? "font-arabic" : "font-sans")}>
                     <Library className="w-5 h-5 shrink-0" />
                     {i18n.language === 'en' ? 'Sources & References' : i18n.language === 'fr' ? 'Sources & Références' : 'المصادر والمراجع'}
                   </h3>
                   <div className="grid sm:grid-cols-2 gap-3">
                     {story.sources.map((src, idx) => (
                       <div key={idx} className={cn("flex items-start gap-3 p-4 rounded-lg bg-white/70 dark:bg-amber-900/10 border border-amber-200/60 dark:border-amber-800/20 shadow-sm", i18n.language === 'ar' ? "flex-row-reverse text-right" : "text-left")}>
                         <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-800/40 text-amber-700 dark:text-amber-300 flex items-center justify-center text-xs font-bold shrink-0">
                           {idx + 1}
                         </span>
                         <div className="flex flex-col gap-1 min-w-0">
                           <span className={cn("text-sm font-bold text-amber-900 dark:text-amber-200 leading-snug", i18n.language === 'ar' ? "font-arabic" : "font-sans")}>
                             {src.title}
                           </span>
                           {src.author && (
                             <span className={cn("text-xs text-amber-700 dark:text-amber-400", i18n.language === 'ar' ? "font-arabic" : "font-sans")}>
                               {src.author}
                             </span>
                           )}
                           <div className={cn("flex flex-wrap gap-1.5 mt-0.5", i18n.language === 'ar' ? "justify-end" : "justify-start")}>
                             {src.volume && (
                               <span className="text-xs bg-amber-100 dark:bg-amber-800/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-700/30">
                                 {i18n.language === 'en' ? 'Vol.' : i18n.language === 'fr' ? 'Vol.' : 'الجزء'} {src.volume}
                               </span>
                             )}
                             {src.ref && (
                               <span className="text-xs bg-amber-100 dark:bg-amber-800/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-700/30">
                                 {i18n.language === 'en' ? 'Hadith No.' : i18n.language === 'fr' ? 'Hadith N°' : 'حديث رقم'} {src.ref}
                               </span>
                             )}
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </motion.div>
             )}

          </div>

          <div className="space-y-6">
            {/* Values Sidebar */}
            <div className="bg-card rounded-xl border border-border shadow-sm p-6 sticky top-24">
              <h3 className={cn("text-lg font-bold mb-4 flex items-center gap-2", i18n.language === 'ar' ? "font-arabic" : "font-sans")}>
                <BookOpen className="w-5 h-5 text-secondary" />
                {t('values_title')}
              </h3>
              <ul className="space-y-3">
                {values.map((value, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className={cn("text-sm font-medium leading-relaxed", i18n.language === 'ar' ? "font-arabic" : "font-sans")}>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
