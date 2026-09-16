import { Story } from "@/types";
import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BookOpen, Star, ChevronRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  story: Story;
  index: number;
}

export default function StoryCard({ story, index }: StoryCardProps) {
  const { t, i18n } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const title = i18n.language === 'en' ? story.title_en || story.title : 
                i18n.language === 'fr' ? story.title_fr || story.title : 
                story.title;
                
  const content = i18n.language === 'en' ? story.content_en || story.content :
                  i18n.language === 'fr' ? story.content_fr || story.content :
                  story.content;

  const values = i18n.language === 'en' ? story.values_en || story.values :
                 i18n.language === 'fr' ? story.values_fr || story.values :
                 story.values;

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(story.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/story/${story.id}`} className="block h-full group">
          <Card className="h-full overflow-hidden border-border/50 hover:shadow-lg hover:border-primary/30 transition-all duration-300 bg-card/50 backdrop-blur-sm group-hover:-translate-y-1 relative">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-2 left-2 z-10 rounded-full bg-background/50 backdrop-blur hover:bg-background/80",
                isFavorite(story.id) && "text-red-500 hover:text-red-600"
              )}
              onClick={handleFavorite}
            >
              <Heart className={cn("h-5 w-5", isFavorite(story.id) && "fill-current")} />
            </Button>
            <CardHeader className="p-0">
              <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-grid-lg" />
                <BookOpen className="w-12 h-12 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                <Badge className="absolute top-4 right-4 bg-background/80 backdrop-blur text-foreground hover:bg-background border-none shadow-sm">
                  {story.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <h3 className={cn("text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors", i18n.language === 'ar' ? "font-arabic" : "font-sans")}>
                {title}
              </h3>
              <p className={cn("text-muted-foreground line-clamp-3 text-sm leading-relaxed", i18n.language === 'ar' ? "font-arabic" : "font-sans")}>
                {content}
              </p>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex items-center justify-between text-sm text-muted-foreground mt-auto">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-secondary" />
                <span>{values.length} {t('values_count')}</span>
              </div>
              <Button variant="ghost" size="sm" className="group-hover:text-primary p-0 h-auto hover:bg-transparent gap-1">
                {t('read_more')} 
                {i18n.language === 'ar' ? 
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                }
              </Button>
            </CardFooter>
          </Card>
      </Link>
    </motion.div>
  );
}
