import { Link, useLocation } from "wouter";
import { Search, Menu, Trophy, Languages, Star, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGamification } from "@/hooks/useGamification";
import DailyChallenge from "@/components/DailyChallenge";
import { useFavorites } from "@/hooks/useFavorites";
import data from "@/data/seerah.json";
import { AppData } from "@/types";
import { cn } from "@/lib/utils";

import logoImage from "@assets/file_00000000695871f4ac1f4baac4cca7a1_1766608125501.png";

const appData = data as unknown as AppData;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { t, i18n } = useTranslation();
  const { points, level, badges } = useGamification();
  const { favorites } = useFavorites();
  const [, navigate] = useLocation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    if (val.trim()) {
      navigate(`/?q=${encodeURIComponent(val.trim())}`);
    } else {
      navigate("/");
    }
  };

  const favoriteStories = appData.stories.filter(s => favorites.includes(s.id));

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="min-h-screen flex flex-col font-sans" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Daily Challenge Trigger (Mobile) */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-[500px] p-0 overflow-hidden border-none rounded-2xl mx-auto">
                <DailyChallenge isModal />
              </DialogContent>
            </Dialog>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
                  <Menu className="h-5 w-5 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side={i18n.language === 'ar' ? 'right' : 'left'} className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" onClick={() => setOpen(false)} className="text-lg font-medium hover:text-primary transition-colors">
                    {t('home')}
                  </Link>

                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">{t('badges')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {badges.map(badgeId => (
                        <div key={badgeId} className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-xs font-bold border border-amber-200 shadow-sm">
                          <Award className="w-4 h-4 text-amber-500" />
                          {t(badgeId)}
                        </div>
                      ))}
                      {badges.length === 0 && <p className="text-sm text-muted-foreground italic">{t('no_badges', { defaultValue: 'No badges yet' })}</p>}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">{t('favorites')}</h3>
                    <div className="flex flex-col gap-2">
                      {favoriteStories.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">{t('no_favorites', { defaultValue: 'No favorites yet' })}</p>
                      ) : (
                        favoriteStories.map(story => (
                          <Link key={story.id} href={`/story/${story.id}`} onClick={() => setOpen(false)} className="text-sm hover:text-primary transition-colors truncate">
                            {i18n.language === 'en' ? story.title_en || story.title : 
                             i18n.language === 'fr' ? story.title_fr || story.title : 
                             story.title}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <img src={logoImage} alt="السيرة النبوية الشريفة" className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg shadow-md group-hover:shadow-lg transition-shadow" />
              <h1 className={cn("text-lg sm:text-xl font-bold font-arabic text-foreground hidden sm:block", i18n.language !== 'ar' && "font-sans")}>
                {t('app_title')}
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            {/* Daily Challenge Trigger (Desktop) */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2 border-amber-200 bg-amber-50/50 hover:bg-amber-100/50 text-amber-700 rounded-full px-4">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t('daily_challenge')}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none">
                <DailyChallenge isModal />
              </DialogContent>
            </Dialog>

            {/* Gamification Badge */}
            <div className="flex items-center gap-2 sm:gap-3 bg-secondary/10 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-secondary/20 shadow-sm transition-all hover:bg-secondary/20">
              <Trophy className="w-5 h-5 sm:w-8 sm:h-8 text-secondary drop-shadow-sm" />
              <div className="flex flex-col leading-tight">
                <span className="text-xs sm:text-base font-bold text-amber-500 dark:text-amber-400 truncate max-w-[60px] sm:max-w-none">{t(level.name)}</span>
                <span className="text-[10px] sm:text-sm text-muted-foreground font-medium">{points} {t('points')}</span>
              </div>
            </div>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Languages className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('ar')}>العربية</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('fr')}>Français</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative hidden lg:block w-48 xl:w-64">
              <Search className={cn("absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground", i18n.language === 'ar' ? "right-3" : "left-3")} />
              <input 
                type="text"
                value={searchValue}
                onChange={handleSearch}
                placeholder={t('search_placeholder')}
                className={cn(
                  "w-full h-10 rounded-full border border-border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-arabic text-sm",
                  i18n.language === 'ar' ? "pr-10 pl-4" : "pl-10 pr-4"
                )}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t bg-muted/30 mt-auto">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p className="font-arabic">{t('footer_text')}</p>
          <p className="text-sm mt-2 opacity-70">{t('rights_reserved')} © {new Date().getFullYear()}</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-primary/80 font-medium">
             <span className="text-red-500 animate-pulse">❤</span>
             <span>{t('made_with_love')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
