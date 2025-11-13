import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const questions = [
  { q: "Какую роль ты предпочитаешь в MM2?", a: ["Невинный", "Шериф", "Убийца"] },
  { q: "Твоя любимая карта?", a: ["Office", "Factory", "Mansion"] },
  { q: "Что делаешь в начале раунда как невинный?", a: ["Прячусь", "Ищу оружие", "Бегаю за шерифом"] },
  { q: "Твоя тактика как убийца?", a: ["Быстрая атака", "Тихая охота", "Маскировка под невинного"] },
  { q: "Лучшее оружие для шерифа?", a: ["Пистолет", "Револьвер", "Автомат"] },
  { q: "Как часто ты выигрываешь?", a: ["Редко", "Иногда", "Часто"] },
  { q: "Играешь один или с друзьями?", a: ["Один", "С другом", "С командой"] },
  { q: "Твой стиль игры?", a: ["Агрессивный", "Осторожный", "Непредсказуемый"] },
  { q: "Самое важное умение?", a: ["Скорость", "Внимательность", "Стратегия"] },
  { q: "Что делаешь после убийства свидетеля?", a: ["Убегаю", "Маскируюсь", "Атакую снова"] },
  { q: "Любимое время суток в игре?", a: ["День", "Ночь", "Без разницы"] },
  { q: "Какой нож предпочитаешь?", a: ["Классический", "Легендарный", "Уникальный"] },
  { q: "Твоя реакция на предательство?", a: ["Месть", "Прощение", "Игнорирую"] },
  { q: "Как выбираешь цель?", a: ["Случайно", "По поведению", "Самого слабого"] },
  { q: "Используешь ли эмоции?", a: ["Часто", "Редко", "Никогда"] },
  { q: "Что делаешь увидев убийцу?", a: ["Бегу к шерифу", "Прячусь", "Наблюдаю"] },
  { q: "Любимая стратегия шерифа?", a: ["Патрулирование", "Охрана группы", "Охота"] },
  { q: "Доверяешь другим игрокам?", a: ["Да", "Нет", "Иногда"] },
  { q: "Используешь чат?", a: ["Всегда", "Редко", "Никогда"] },
  { q: "Реакция на проигрыш?", a: ["Злюсь", "Анализирую", "Не обращаю внимания"] },
  { q: "Что важнее - победа или процесс?", a: ["Победа", "Процесс", "Оба равны"] },
  { q: "Используешь звук в игре?", a: ["Да", "Нет", "Иногда"] },
  { q: "Меняешь тактику во время игры?", a: ["Часто", "Редко", "Никогда"] },
  { q: "Следишь за обновлениями?", a: ["Всегда", "Иногда", "Нет"] },
  { q: "Твое отношение к новичкам?", a: ["Помогаю", "Игнорирую", "Использую"] },
  { q: "Предпочитаешь большие или малые карты?", a: ["Большие", "Малые", "Средние"] },
  { q: "Как реагируешь на читеров?", a: ["Репорчу", "Выхожу", "Продолжаю играть"] },
  { q: "Используешь ловушки?", a: ["Часто", "Редко", "Никогда"] },
  { q: "Что делаешь в лобби?", a: ["Общаюсь", "Жду", "Настраиваю"] },
  { q: "Твоя любимая роль?", a: ["Невинный", "Шериф", "Убийца"] },
  { q: "Как быстро принимаешь решения?", a: ["Мгновенно", "Обдуманно", "Медленно"] },
  { q: "Предпочитаешь соло или групповые действия?", a: ["Соло", "Группа", "Зависит"] },
  { q: "Играешь на телефоне или ПК?", a: ["Телефон", "ПК", "Оба"] },
  { q: "Какое оружие избегаешь?", a: ["Ближний бой", "Дальний бой", "Все использую"] },
  { q: "Твоя стратегия выживания?", a: ["Бегство", "Скрытность", "Сопротивление"] },
  { q: "Как относишься к командной игре?", a: ["Люблю", "Терплю", "Избегаю"] },
  { q: "Что важнее - скилл или удача?", a: ["Скилл", "Удача", "Оба"] },
  { q: "Используешь ли секретные проходы?", a: ["Всегда", "Иногда", "Не знаю где"] },
  { q: "Реакция на неожиданную атаку?", a: ["Контратака", "Бегство", "Паника"] },
  { q: "Помнишь карты наизусть?", a: ["Да", "Частично", "Нет"] },
  { q: "Анализируешь поведение игроков?", a: ["Всегда", "Иногда", "Нет"] },
  { q: "Что делаешь после победы?", a: ["Радуюсь", "Спокойно продолжаю", "Провоцирую"] },
  { q: "Предпочитаешь быстрые или долгие раунды?", a: ["Быстрые", "Долгие", "Средние"] },
  { q: "Используешь психологию в игре?", a: ["Да", "Нет", "Не задумывался"] },
  { q: "Какой элемент игры нравится больше?", a: ["Экшен", "Стратегия", "Социальность"] },
  { q: "Реакция на багги игрока?", a: ["Использую", "Игнорирую", "Репорчу"] },
  { q: "Твой стиль общения в игре?", a: ["Дружелюбный", "Нейтральный", "Агрессивный"] },
  { q: "Следишь за мета-игрой?", a: ["Да", "Нет", "Иногда"] },
  { q: "Как выбираешь сервер?", a: ["Случайно", "По пингу", "По игрокам"] },
  { q: "Используешь голосовой чат?", a: ["Да", "Нет", "Редко"] },
  { q: "Что делаешь когда тебя подозревают?", a: ["Защищаюсь", "Убегаю", "Атакую"] },
  { q: "Предпочитаешь открытые или закрытые пространства?", a: ["Открытые", "Закрытые", "Оба"] },
  { q: "Как относишься к трейдам?", a: ["Активно торгую", "Иногда", "Не интересуюсь"] },
  { q: "Реакция на лаг?", a: ["Терплю", "Выхожу", "Злюсь"] },
  { q: "Используешь кастомизацию?", a: ["Максимально", "Немного", "Не использую"] },
  { q: "Что делаешь в начале как шериф?", a: ["Охраняю", "Патрулирую", "Выслеживаю"] },
  { q: "Твоя тактика в финале?", a: ["Агрессия", "Защита", "Хитрость"] },
  { q: "Предпочитаешь играть днем или ночью?", a: ["Днем", "Ночью", "Без разницы"] },
  { q: "Как часто меняешь скин?", a: ["Часто", "Редко", "Никогда"] },
  { q: "Реакция на несправедливость?", a: ["Протестую", "Принимаю", "Выхожу"] },
  { q: "Что важнее - опыт или интуиция?", a: ["Опыт", "Интуиция", "Оба"] },
  { q: "Используешь тактику отвлечения?", a: ["Часто", "Редко", "Никогда"] },
  { q: "Как выбираешь момент для атаки?", a: ["Интуитивно", "Расчетливо", "Спонтанно"] },
  { q: "Предпочитаешь активную или пассивную игру?", a: ["Активную", "Пассивную", "Комбинирую"] },
  { q: "Что делаешь после смерти в раунде?", a: ["Наблюдаю", "Ухожу в меню", "Помогаю советами"] },
  { q: "Реакция на критику стиля игры?", a: ["Улучшаюсь", "Игнорирую", "Защищаюсь"] },
  { q: "Используешь читы или глитчи?", a: ["Никогда", "Пробовал", "Регулярно"] },
  { q: "Что важнее - рейтинг или веселье?", a: ["Рейтинг", "Веселье", "Баланс"] },
  { q: "Твоя главная цель в MM2?", a: ["Побеждать", "Развлекаться", "Коллекционировать"] },
  { q: "Финальный вопрос - ты готов к результатам?", a: ["Да, конечно!", "Немного волнуюсь", "Посмотрим"] }
];

type Section = 'home' | 'about' | 'rules' | 'quiz' | 'results';

const Index = () => {
  const [section, setSection] = useState<Section>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setSection('results');
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    setSection('home');
  };

  const calculateResults = () => {
    const roleScores = { innocent: 0, sheriff: 0, murderer: 0 };
    
    answers.forEach((answer) => {
      if (answer === 0) roleScores.innocent++;
      else if (answer === 1) roleScores.sheriff++;
      else roleScores.murderer++;
    });

    const total = answers.length;
    return {
      innocent: Math.round((roleScores.innocent / total) * 100),
      sheriff: Math.round((roleScores.sheriff / total) * 100),
      murderer: Math.round((roleScores.murderer / total) * 100)
    };
  };

  const getDominantRole = () => {
    const results = calculateResults();
    if (results.murderer >= results.sheriff && results.murderer >= results.innocent) {
      return { role: 'Убийца', desc: 'Ты хладнокровен и расчетлив. Ночь - твоя стихия, а тени - твои союзники.', icon: 'Skull' };
    } else if (results.sheriff >= results.innocent) {
      return { role: 'Шериф', desc: 'Ты защитник и борец за справедливость. Твоя миссия - защищать невинных.', icon: 'Shield' };
    } else {
      return { role: 'Невинный', desc: 'Ты мирный житель, который полагается на интуицию и командную работу.', icon: 'Users' };
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Icon name="Knife" className="text-secondary" />
              Опросник от Юпитера
            </h1>
            <div className="flex gap-2">
              <Button variant={section === 'home' ? 'default' : 'ghost'} onClick={() => setSection('home')}>
                <Icon name="Home" className="mr-2" size={16} />
                Главная
              </Button>
              <Button variant={section === 'about' ? 'default' : 'ghost'} onClick={() => setSection('about')}>
                <Icon name="Info" className="mr-2" size={16} />
                О игре
              </Button>
              <Button variant={section === 'rules' ? 'default' : 'ghost'} onClick={() => setSection('rules')}>
                <Icon name="BookOpen" className="mr-2" size={16} />
                Правила
              </Button>
              {quizCompleted && (
                <Button variant={section === 'results' ? 'default' : 'ghost'} onClick={() => setSection('results')}>
                  <Icon name="Trophy" className="mr-2" size={16} />
                  Результаты
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {section === 'home' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Murder Mystery 2
              </h2>
              <p className="text-xl text-muted-foreground">Узнай свою истинную роль в мире MM2</p>
            </div>
            
            <Card className="border-primary/50 shadow-2xl shadow-primary/20">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Icon name="Target" className="text-secondary" />
                  Добро пожаловать, детектив
                </CardTitle>
                <CardDescription className="text-lg">
                  Пройди 70 вопросов и раскрой свою настоящую сущность в Murder Mystery 2
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-card/50 border-primary/30">
                    <CardContent className="pt-6 text-center">
                      <Icon name="Users" size={40} className="mx-auto mb-3 text-primary" />
                      <h3 className="font-bold mb-2">Невинный</h3>
                      <p className="text-sm text-muted-foreground">Выживи и найди убийцу</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 border-secondary/30">
                    <CardContent className="pt-6 text-center">
                      <Icon name="Shield" size={40} className="mx-auto mb-3 text-secondary" />
                      <h3 className="font-bold mb-2">Шериф</h3>
                      <p className="text-sm text-muted-foreground">Защити невинных</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 border-destructive/30">
                    <CardContent className="pt-6 text-center">
                      <Icon name="Skull" size={40} className="mx-auto mb-3 text-destructive" />
                      <h3 className="font-bold mb-2">Убийца</h3>
                      <p className="text-sm text-muted-foreground">Устрани всех свидетелей</p>
                    </CardContent>
                  </Card>
                </div>
                <Button 
                  onClick={() => setSection('quiz')} 
                  className="w-full text-lg py-6 animate-glow"
                  size="lg"
                >
                  <Icon name="Play" className="mr-2" />
                  Начать опрос
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {section === 'about' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Icon name="Gamepad2" className="text-primary" />
                  О Murder Mystery 2
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg">
                <p>
                  Murder Mystery 2 - популярная игра в Roblox, где игроки принимают роли Невинных, Шерифа или Убийцы.
                </p>
                <p>
                  <strong>Невинные</strong> должны выжить и помочь Шерифу найти Убийцу, собирая монеты и избегая опасности.
                </p>
                <p>
                  <strong>Шериф</strong> имеет пистолет и должен выстрелить в Убийцу, но будь осторожен - выстрел в невинного означает смерть!
                </p>
                <p>
                  <strong>Убийца</strong> должен тайно устранить всех, оставаясь незамеченным и используя элемент внезапности.
                </p>
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/30 mt-6">
                  <p className="text-center font-semibold">
                    <Icon name="Sparkles" className="inline mr-2" />
                    Игра требует стратегии, внимательности и хорошей реакции!
                  </p>
                </div>
                <div className="bg-secondary/5 p-3 rounded-lg border border-secondary/20 mt-4">
                  <p className="text-center text-sm text-muted-foreground italic">
                    P.S. Карина лучшая
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {section === 'rules' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <Icon name="ScrollText" className="text-primary" />
                  Правила опроса
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Отвечай честно</h3>
                      <p className="text-muted-foreground">Выбирай ответы, которые действительно описывают твой стиль игры</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Не спеши</h3>
                      <p className="text-muted-foreground">Подумай над каждым вопросом, вернуться назад нельзя</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Выбери один ответ</h3>
                      <p className="text-muted-foreground">Из трех вариантов выбери наиболее подходящий</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Узнай результат</h3>
                      <p className="text-muted-foreground">После всех 70 вопросов ты получишь анализ своего игрового стиля</p>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/30 mt-6">
                  <p className="text-center">
                    <Icon name="AlertCircle" className="inline mr-2" />
                    Это развлекательный опрос, результаты не влияют на твой аккаунт в игре
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {section === 'quiz' && !quizCompleted && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
                <span>{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
              </div>
              <Progress value={((currentQuestion) / questions.length) * 100} className="h-2" />
            </div>

            <Card className="border-primary/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">{questions[currentQuestion].q}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={selectedAnswer?.toString()} onValueChange={(val) => setSelectedAnswer(parseInt(val))}>
                  {questions[currentQuestion].a.map((answer, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-all cursor-pointer">
                      <RadioGroupItem value={idx.toString()} id={`answer-${idx}`} />
                      <Label htmlFor={`answer-${idx}`} className="flex-1 cursor-pointer text-lg">
                        {answer}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <Button 
                  onClick={handleAnswer} 
                  disabled={selectedAnswer === null}
                  className="w-full text-lg py-6"
                  size="lg"
                >
                  {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Завершить опрос'}
                  <Icon name="ArrowRight" className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {section === 'results' && quizCompleted && (
          <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
            <Card className="border-primary/50 shadow-2xl shadow-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl mb-2">Твои результаты</CardTitle>
                <CardDescription className="text-lg">Анализ твоего стиля игры в MM2</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center p-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-primary/30">
                  <Icon name={getDominantRole().icon as any} size={80} className="mx-auto mb-4 text-primary" />
                  <h2 className="text-4xl font-bold mb-3">{getDominantRole().role}</h2>
                  <p className="text-xl text-muted-foreground">{getDominantRole().desc}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold flex items-center gap-2">
                        <Icon name="Users" size={20} />
                        Невинный
                      </span>
                      <span className="text-muted-foreground">{calculateResults().innocent}%</span>
                    </div>
                    <Progress value={calculateResults().innocent} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold flex items-center gap-2">
                        <Icon name="Shield" size={20} />
                        Шериф
                      </span>
                      <span className="text-muted-foreground">{calculateResults().sheriff}%</span>
                    </div>
                    <Progress value={calculateResults().sheriff} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold flex items-center gap-2">
                        <Icon name="Skull" size={20} />
                        Убийца
                      </span>
                      <span className="text-muted-foreground">{calculateResults().murderer}%</span>
                    </div>
                    <Progress value={calculateResults().murderer} className="h-3" />
                  </div>
                </div>

                <Button onClick={resetQuiz} variant="outline" className="w-full text-lg py-6" size="lg">
                  <Icon name="RotateCcw" className="mr-2" />
                  Пройти опрос заново
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Sparkles" size={16} />
            Опросник от Юпитера • Murder Mystery 2 Quiz
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;