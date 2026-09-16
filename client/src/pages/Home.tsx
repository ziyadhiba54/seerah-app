import { useEffect } from "react";
import { AppData } from "@/types";
import data from "@/data/seerah.json";
import Layout from "@/components/Layout";
import StoryCard from "@/components/StoryCard";
import DailyChallenge from "@/components/DailyChallenge";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearch } from "wouter";
import heroImage from "@assets/generated_images/elegant_islamic_geometric_pattern_in_emerald_and_gold.png";
import logoImage from "@assets/file_00000000695871f4ac1f4baac4cca7a1_1766608125501.png";

const appData = data as unknown as AppData & { did_you_know: any[] };

export default function Home() {
  const { t, i18n } = useTranslation();
  const search = useSearch();
  const searchQuery = new URLSearchParams(search).get("q") || "";

  useEffect(() => {
    document.title = "السيرة النبوية الشريفة | تطبيق تعليمي عن حياة النبي محمد ﷺ";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "تطبيق تعليمي إسلامي شامل — 30 قصة من حياة النبي محمد ﷺ، اختبارات تفاعلية، وتحديات يومية بالعربية والفرنسية والإنجليزية.");
  }, [i18n.language]);

  // Filter stories based on search query
  const filteredStories = searchQuery
    ? appData.stories.filter((s) => {
        const q = searchQuery.toLowerCase();
        return (
          s.title.toLowerCase().includes(q) ||
          (s.title_en && s.title_en.toLowerCase().includes(q)) ||
          (s.title_fr && s.title_fr.toLowerCase().includes(q)) ||
          s.category.toLowerCase().includes(q) ||
          s.content.toLowerCase().includes(q)
        );
      })
    : appData.stories;
  
  // Deterministic "Did you know?" selection based on date
  const getDailyFact = () => {
    if (!appData.did_you_know || appData.did_you_know.length === 0) return null;
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const fact = appData.did_you_know[dayOfYear % appData.did_you_know.length];
    
    return i18n.language === 'en' ? fact.text_en :
           i18n.language === 'fr' ? fact.text_fr :
           fact.text;
  };

  const dailyFact = getDailyFact();

  return (
    <Layout>
      {!searchQuery && (
        <>
          <section className="relative rounded-3xl overflow-hidden mb-12 min-h-[400px] flex items-center justify-center text-center px-4 shadow-xl">
            <div
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-0" />
            <div className="absolute inset-0 bg-emerald-950/30 z-0 mix-blend-multiply" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-6 p-6 rounded-2xl bg-background/10 backdrop-blur-sm border border-white/10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <img src={logoImage} alt="Logo" className="h-32 w-32 mb-6 drop-shadow-lg" />
                <Badge variant="outline" className="mb-4 px-4 py-1 text-primary-foreground border-primary-foreground/30 bg-primary/20 backdrop-blur-sm">
                  {appData.app_info.version} الإصدار
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold font-arabic text-primary-foreground mb-6 leading-tight drop-shadow-md">
                  {appData.app_info.name}
                </h1>
                <p className="text-xl text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto font-medium">
                  {appData.app_info.description}
                </p>
              </motion.div>
            </div>
          </section>

          {dailyFact && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-12 bg-primary/5 border border-primary/20 rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Lightbulb className="w-24 h-24 text-primary" />
              </div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary/70">{t('did_you_know')}</h3>
                  <p className="text-lg md:text-xl font-medium text-foreground/90 leading-relaxed italic">
                    {dailyFact}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold font-arabic text-foreground relative inline-block">
            <span className="relative z-10">{searchQuery ? `نتائج البحث عن "${searchQuery}"` : "قصص السيرة"}</span>
            <span className="absolute bottom-2 right-0 w-full h-3 bg-secondary/20 -z-0 rounded-full" />
          </h2>
        </div>

        {searchQuery && (
          <p className="text-sm text-muted-foreground">
            {filteredStories.length > 0
              ? `${filteredStories.length} نتيجة`
              : "لا توجد نتائج — حاول بكلمات أخرى"}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
