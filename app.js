require('dotenv').config();
const mongoose = require('mongoose');
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN, {
    polling: {
        interval: 300,
        autoStart: true
    }
});
// Connect to MongoDB database
mongoose.connect('mongodb+srv://user:password@webtech.yks5px6.mongodb.net/telegramBotTest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Define mongoose schema for start command stats
const startCommandSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }
});
// Create mongoose model
const StartCommandStats = mongoose.model('StartCommandStats', startCommandSchema);

// Define mongoose schema for message stats
const aboutOlympiadSchema = new mongoose.Schema({
    phrases: {
        type: Map,
        of: Number,
        default: {}
    },
    uniqueUsers: {
        type: [Number], // Array to store unique user IDs
        default: []
    }
});
// Create a model
const AboutOlympiadModel = mongoose.model('AboutOlympiad', aboutOlympiadSchema);

// Define mongoose schema for message stats
const MainDatesSchema = new mongoose.Schema({
    phrases: {
        type: Map,
        of: Number,
        default: {}
    },
    uniqueUsers: {
        type: [Number], // Array to store unique user IDs
        default: []
    }
});
// Create a model
const MainDatesModel = mongoose.model('MainDates', MainDatesSchema);

const ForgotLoginSchema = new mongoose.Schema({
    phrases: {
        type: Map,
        of: Number,
        default: {}
    },
    uniqueUsers: {
        type: [Number], // Array to store unique user IDs
        default: []
    }
});
// Create a model
const ForgotLoginModel = mongoose.model('ForgotLogin', ForgotLoginSchema);

const ForgotPasswordSchema = new mongoose.Schema({
    phrases: {
        type: Map,
        of: Number,
        default: {}
    },
    uniqueUsers: {
        type: [Number], // Array to store unique user IDs
        default: []
    }
});
// Create a model
const ForgotPasswordModel = mongoose.model('ForgotPassword', ForgotPasswordSchema);

const HowToStartSchema = new mongoose.Schema({
    phrases: {
        type: Map,
        of: Number,
        default: {}
    },
    uniqueUsers: {
        type: [Number], // Array to store unique user IDs
        default: []
    }
});
// Create a model
const HowToStartModel = mongoose.model('HowToStart', HowToStartSchema);

const TechSupportSchema = new mongoose.Schema({
    phrases: {
        type: Map,
        of: Number,
        default: {}
    },
    uniqueUsers: {
        type: [Number], // Array to store unique user IDs
        default: []
    }
});
// Create a model
const TechSupportModel = mongoose.model('TechSupport', TechSupportSchema);

const aboutOlympiadSchemaKZ = new mongoose.Schema({
    phrases: {
        type: Map,
        of: Number,
        default: {}
    },
    uniqueUsers: {
        type: [Number], // Array to store unique user IDs
        default: []
    }
});
// Create a model based on the messageStatsSchema
const AboutOlympiadModelKZ = mongoose.model('AboutOlympiadKZ', aboutOlympiadSchemaKZ);

const MainDatesSchemaKZ = new mongoose.Schema({
    phrases: {
        type: Map,
        of: Number,
        default: {}
    },
    uniqueUsers: {
        type: [Number], // Array to store unique user IDs
        default: []
    }
});
// Create a model
const MainDatesModelKZ = mongoose.model('MainDatesKZ', MainDatesSchemaKZ);

const ForgotLoginSchemaKZ = new mongoose.Schema({
    phrases: {
        type: Map,
        of: Number,
        default: {}
    },
    uniqueUsers: {
        type: [Number], // Array to store unique user IDs
        default: []
    }
});
// Create a model
const ForgotLoginModelKZ = mongoose.model('ForgotLoginKZ', ForgotLoginSchemaKZ);

const ForgotPasswordSchemaKZ = new mongoose.Schema({
    phrases: {
        type: Map,
        of: Number,
        default: {}
    },
    uniqueUsers: {
        type: [Number], // Array to store unique user IDs
        default: []
    }
});
// Create a model
const ForgotPasswordModelKZ = mongoose.model('ForgotPasswordKZ', ForgotPasswordSchemaKZ);

const HowToStartSchemaKZ = new mongoose.Schema({
    phrases: {
        type: Map,
        of: Number,
        default: {}
    },
    uniqueUsers: {
        type: [Number], // Array to store unique user IDs
        default: []
    }
});
// Create a model
const HowToStartModelKZ = mongoose.model('HowToStartKZ', HowToStartSchemaKZ);

const TechSupportSchemaKZ = new mongoose.Schema({
    phrases: {
        type: Map,
        of: Number,
        default: {}
    },
    uniqueUsers: {
        type: [Number], // Array to store unique user IDs
        default: []
    }
});
// Create a model
const TechSupportModelKZ = mongoose.model('TechSupportKZ', TechSupportSchemaKZ);
// Handle /start command
bot.start(async (ctx) => {
    try {
        // Check if the user has blocked the bot
        if (!ctx.chat || !ctx.chat.id) {
            console.log('User has blocked the bot or is unreachable.');
            return;
        }
        // Increment start command count in the database
        await StartCommandStats.findOneAndUpdate({}, { $inc: { count: 1 } }, { upsert: true });
        console.log('Start command usage updated in the database.');

        // Your /start command logic here
        ctx.reply('Выберите язык:' + '\n' + 'Тілді танданыз:', languagesKeyboard);
    } catch (error) {
        console.error('Error updating start command usage:', error);
    }
});

const languagesKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('Русский', 'russian'),
    Markup.button.callback('Қазақша', 'kazakh'),
]);

const mainMenuKeyboardRU = Markup.keyboard([
    ['Об олимпиаде Мың бала'],
    ['Все важные сроки олимпиады'],
    ['Не помню логин от личного кабинета'],
    ['Не помню пароль от личного кабинета или не могу войти в личный кабинет'],
    ['Как начать тест?'],
    ['Технические неполадки - не могу сдать тест'],
        ['Сменить язык']
]).oneTime();
const mainMenuKeyboardKZ = Markup.keyboard([
    ['Мың бала олимпиадасы туралы'],
    ['Олимпиаданың барлық маңызды мерзімдері'],
    ['Жеке кабинетінің логині есімде жоқ'],
    ['Жеке кабинеттің құпия сөзі есімде жоқ немесе жеке кабинетке кіре алмаймын'],
    ['Тестті қалай бастауға болады?'],
    ['Техникалық ақаулар - тест тапсыра алмаймын'],
        ['Тілді өзгерту']
]).oneTime();
bot.hears('Сменить язык', (ctx) => {
    ctx.reply('Выберите язык:' + '\n' + 'Тілді танданыз:', languagesKeyboard);
});
bot.hears('Тілді өзгерту', (ctx) => {
    ctx.reply('Выберите язык:' + '\n' + 'Тілді танданыз:', languagesKeyboard);
});
async function sendWelcomeMessageRu(ctx) {
    await ctx.reply('Добро пожаловать на Национальную олимпиаду Мың бала для учеников 6 класса сельских школ. \n' +
        '\n' +
        'На первом этапе олимпиады можно принять участие только с ноутбука или компьютера с веб-камерой, так как используется система прокторинга для проверки академической честности.\n' +
        '\n' +
        '1000bala.elumiti.kz\n' +
        '8 727 310 02 58 call center (звонок платный)');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await ctx.reply('Чем мы вам можем помочь?', mainMenuKeyboardRU);
}

bot.action('russian', (ctx) => {
    sendWelcomeMessageRu(ctx);
});
bot.hears('На главную', (ctx) => {
    sendWelcomeMessageRu(ctx);
});
async function sendWelcomeMessageKz(ctx) {
    await ctx.reply('Ауыл мектептерінің 6 сынып оқушыларына арналған "Мың бала" ұлттық олимпиадасына қош келдіңіздер!\n' +
        '\n' +
        'Олимпиаданың бірінші кезеңінде академиялық адалдықты тексеру мақсатында прокторинг жүйесі қолданылады. Сондықтан тек ноутбук немесе веб-камерасы бар компьютер арқылы қатысуға болады.\n' +
        '\n' +
        '1000bala.elumiti.kz\n' +
        '8 727 310 02 58 call center (қоңырау шалу - ақылы)');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await ctx.reply('Біз сізге қалай көмектесе аламыз?', mainMenuKeyboardKZ);
}
bot.action('kazakh', (ctx) => {
    sendWelcomeMessageKz(ctx);
});
bot.hears('Басты бетке', (ctx) => {
    sendWelcomeMessageKz(ctx);
});

// Об олимпиаде Мың бала
bot.hears('Об олимпиаде Мың бала', async (ctx) => {
    ctx.reply('Выберите интересующий вас вопрос:',
        Markup.keyboard([
            ['Кто сможет участвовать в олимпиаде?'],
            ['Учителя каких предметов могут претендовать на сертификат?'],
            ['Какие предметы в 1 этапе?'],
            ['Какие предметы во 2 этапе?'],
            ['Как и где проходит 1 этап?'],
            ['Технические требования к сдаче 1 этапа'],
            ['Можно ли подать апелляцию или пересдать тест?'],
            ['Что такое прокторинг? И почему тест 1 этапа можно сдать только через ноутбук или компьютер с web камерой?'],
            ['Как можно подготовиться и выиграть олимпиаду?'],
            ['Как и где проходит 2 этап?'],
            ['На главную']
        ]).oneTime()
    );
    try {
        const userId = ctx.from.id;

        let aboutOlympiadInstance = await AboutOlympiadModel.findOne({});
        if (!aboutOlympiadInstance) {
            // If no document is found, initialize with default values
            aboutOlympiadInstance = new AboutOlympiadModel();
        }

        if (!aboutOlympiadInstance.uniqueUsers.includes(userId)) {
            await aboutOlympiadInstance.updateOne({
                $inc: { 'phrases.Об олимпиаде Мың бала': 1 },
                $addToSet: { uniqueUsers: userId }
            }, { upsert: true });
            console.log(`Count for "Об олимпиаде Мың бала" updated in the database for user ${userId}.`);

            // Your logic for handling the specific phrase here
        } else {
            console.log(`User ${userId} already sent "Об олимпиаде Мың бала".`);
        }
    } catch (error) {
        console.error('Error updating count for "Об олимпиаде Мың бала":', error);
    }
});
bot.hears('Кто сможет участвовать в олимпиаде?', (ctx) => {
    ctx.reply('Только зарегистрированные до 10 марта участники из 6 классов сельских школ', Markup.keyboard([
        ['На главную']
    ]).oneTime());

});
bot.hears('Учителя каких предметов могут претендовать на сертификат?', (ctx) => {
    ctx.reply('"Учителя слудующих предметов могут претендовать на сертификат:\n' +
        '- математика\n' +
        '- казахский язык (казахоязычные школы)\n' +
        '- русский язык (русскоязычные школы)\n' +
        '- английский язык\n' +
        '- естествознание (география, биология)"', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Какие предметы в 1 этапе?', (ctx) => {
    ctx.reply('Логическое мышление - 20 вопросов\n' +
        'Пространственное мышление - 20 вопросов', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Какие предметы во 2 этапе?', (ctx) => {
    ctx.reply('"Математика - 40 вопросов\n' +
        'Родной язык - 20 вопросов\n' +
        'Английский язык - 20 вопросов\n' +
        'Естествознание - 20 вопросов"', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Как и где проходит 1 этап?', (ctx) => {
    ctx.reply('Тестирование 1 этапа проходиит с 1 по 10 апреля на нашем сайте 1000bala.elumiti.kz с использованием системы прокторинг для проверки академической честности. Прохождение теста доступно только с ноутбука или компьютера с веб-камерой. \n' +
        'По итогам 1 этапа будут отобраны топ 5000 участников для прохождения на следующий 2 этап.', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Технические требования к сдаче 1 этапа', (ctx) => {
    ctx.reply('Убедитесь,что у вас компьютер или ноутбук на базе ОС Windows (предпочтительно) или Mac. \n' +
        'Соответствует техническим требованиям для системы тестирования:\n' +
        '• 4 Гб оперативной памяти;\n' +
        '• наличие веб-камеры (проверить подключение к системному блоку) - если компьютер\n' +
        '• наличие работоспособной камеры - если ноутбук\n' +
        '• наличие стабильного интернет-соединения не менее 1 Мбит/сек на 1 рабочее место;\n' +
        '• последние актуальные версии рекомендуемых браузеров Google Chrome, Mozilla Firefox, Opera, Yandex.', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Можно ли подать апелляцию или пересдать тест?', (ctx) => {
    ctx.reply('Пересдача тестирования возможна только по решению Организационного комитета. Для тех участников, кто не смог пройти тестирование по причинам форс мажора, апелляция не предусмотрена.', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Что такое прокторинг? И почему тест 1 этапа можно сдать только через ноутбук или компьютер с web камерой?', (ctx) => {
    ctx.reply('Прокторинг - это процедура контроля соблюдения правил академической честности во время Олимпиады. Прокторинг нужен для выявления фактов нарушений академической честности на платформе.', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Как можно подготовиться и выиграть олимпиаду?', (ctx) => {
    ctx.reply('Для того, чтобы подготовиться к олимпиаде у вас есть возможность пройти пробное тестирование на ro.elumiti.kz. \n' +
        'Пробное тестирование включает в себя задания олимпиады «Мың бала» предыдущих лет и поможет вам ознакомиться с аналогичными задачами, с которыми вы столкнетесь на олимпиаде. \n' +
        'Оплатив один раз, у вас есть возможность пройти тестирование три раза. \n' +
        'Количество покупок неограниченно. \n' +
        'Стоимость пробного теста – 1000 тенге.', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Как и где проходит 2 этап?', (ctx) => {
    ctx.reply('На втором этапа олимпиады могут участвовать только ТОП 5000 участников первого этапа. \n' +
        'Даты проведения 2 этапа с 24 по 26 апреля. 2 этап будет проходить в региональных центрах тестирования Ustudy. \n' +
        'Подробнее об участнии на втором этапе мы сообщим персонально всем 5000 участникам.', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});



// Мың бала олимпиадасы туралы
bot.hears('Мың бала олимпиадасы туралы', async(ctx) => {
    ctx.reply('Сізді қызықтыратын сұрақты таңдаңыз:',
        Markup.keyboard([
            ['Олимпиадаға кім қатыса алады?'],
            ['Қандай пәндер бойынша мұғалімдер сертификатқа ие бола алады?'],
            ['1 кезеңде тестілеу қандай пәндер бойынша жүргізіледі?'],
            ['2 кезеңде тестілеу қандай пәндер бойынша жүргізіледі?'],
            ['1 кезең қалай және қайда өтеді?'],
            ['1 кезеңді өтуге техникалық талаптар'],
            ['Мен апелляцияға бере аламын ба немесе тестті қайта тапсыра аламын ба?'],
            ['Прокторинг деген не? Неліктен 1 кезеңді тек ноутбук немесе web камерасы бар компьютер арқылы өтуге болады?'],
            ['Олимпиадаға қалай дайындалып, жеңіске жетуге болады?'],
            ['2 кезең қалай және қайда өтеді?'],
            ['Басты бетке']
        ]).oneTime()
    );
    try {
        const userId = ctx.from.id;
        let aboutOlympiadInstanceKZ = await AboutOlympiadModelKZ.findOne({});
        if (!aboutOlympiadInstanceKZ) {
            // If no document is found, initialize with default values
            aboutOlympiadInstanceKZ = new AboutOlympiadModelKZ();
        }

        if (!aboutOlympiadInstanceKZ.uniqueUsers.includes(userId)) {
            await aboutOlympiadInstanceKZ.updateOne({
                $inc: { 'phrases.Мың бала олимпиадасы туралы': 1 },
                $addToSet: { uniqueUsers: userId }
            }, { upsert: true });
            console.log(`Count for "Мың бала олимпиадасы туралы" updated in the database for user ${userId}.`);

            // Your logic for handling the specific phrase here
        } else {
            console.log(`User ${userId} already sent "Мың бала олимпиадасы туралы".`);
        }
    } catch (error) {
        console.error('Error updating count for "Мың бала олимпиадасы туралы":', error);
    }
});

bot.hears('Олимпиадаға кім қатыса алады?', (ctx) => {
    ctx.reply('Тек 10 наурызға дейін тіркелген ауыл мектептерінің 6 сынып оқушылары', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('Қандай пәндер бойынша мұғалімдер сертификатқа ие бола алады?', (ctx) => {
    ctx.reply('Келесі пәндердің мұғалімдері сертификатқа ие бола алады:\n' +
        '- математика\n' +
        '- қазақ тілі (қазақ тілді мектептер)\n' +
        '- орыс тілі (орыс тілді мектептер)\n' +
        '- ағылшын тілі\n' +
        '- Жаратылыстану (география, биология)', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('1 кезеңде тестілеу қандай пәндер бойынша жүргізіледі?', (ctx) => {
    ctx.reply('Логикалық ойлау- 20 сұрақ\n' +
        'Кеңістіктік ойлау- 20 сұрақ', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('2 кезеңде тестілеу қандай пәндер бойынша жүргізіледі?', (ctx) => {
    ctx.reply('Математика - 40 сұрақ\n' +
        'Ана тілі - 20 сұрақ\n' +
        'Ағылшын тілі - 20 сұрақ\n' +
        'Жаратылыстану - 20 сұрақ', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('1 кезең қалай және қайда өтеді?', (ctx) => {
    ctx.reply('1 кезеңді тестілеу біздің сайтта 1 сәуірден 10 сәуірге дейін өтеді  http://1000bala.elumiti.kz/ \n' +
        'Академиялық адалдықты тексеру үшін прокторинг жүйесін қолданылады. Тестті тек ноутбуктен немесе веб-камерасы бар компьютерден алуға болады. \n' +
        'топ5000 қатысушы 1 кезеңнің қорытындысы бойынша келесі 2 кезеңге өтуге іріктеледі.', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('1 кезеңді өтуге техникалық талаптар', (ctx) => {
    ctx.reply('Сізде Windows немесе Mac OS негізіндегі компьютер немесе ноутбук бар екеніне және тестілеу жүйесінің техникалық талаптарына сәйкес келетініне көз жеткізіңіз: \n' +
        '• 4 Гб жедел жады (RAM);\n' +
        '• жұмыс істейтін веб-камераның болуы (жүйелік блокқа қосылуды тексеріңіз)\n' +
        '• 1 жұмыс орнына кемінде 1 Мбит/сек тұрақты интернет байланысы бар болуы;\n' +
        '• ұсынылған браузерлердің соңғы жаңартылған нұсқалары - Google Chrome, Mozilla Firefox, Opera, Yandex.', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('Мен апелляцияға бере аламын ба немесе тестті қайта тапсыра аламын ба?', (ctx) => {
    ctx.reply('Тестілеуді қайта тапсыру ұйымдастыру комитетінің шешімімен ғана мүмкін болады. Форс-мажор себептері бойынша тестілеуден өте алмаған қатысушылар үшін апелляция қарастырылмаған.', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('Прокторинг деген не? Неліктен 1 кезеңді тек ноутбук немесе web камерасы бар компьютер арқылы өтуге болады?', (ctx) => {
    ctx.reply('Прокторинг - бұл Олимпиада кезінде Академиялық адалдық ережелерінің сақталуын бақылау процедурасы. Платформада академиялық адалдықты бұзу фактілерін анықтау үшін Прокторинг қолданылады.', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('Олимпиадаға қалай дайындалып, жеңіске жетуге болады?', (ctx) => {
    ctx.reply('Олимпиадаға дайындалу үшін сізде ro.elumiti.kz сайтында үлгі тапсырма өтуге мүмкіндігіңіз бар. Сынақ тестілеу өткен жылдардағы ""Мың бала"" олимпиадасының тапсырмаларын қамтиды және сізге олимпиадада кездесетін міндеттермен танысуға көмектеседі.\n' +
        ' Бір рет төлегеннен кейін сізде үш рет тестілеу мүмкіндігі бар. Сатып алу саны шексіз. Сынақ тестінің құны-1000 теңге.', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('2 кезең қалай және қайда өтеді?', (ctx) => {
    ctx.reply('Олимпиаданың екінші кезеңіне тек бірінші кезеңнің ТОП 5000 қатысушысы қатыса алады.\n' +
        '2 кезеңді өткізу күндері: 24-26 сәуір аралығында. 2 кезең Ustudy Аймақтық тестілеу орталықтарында өтеді. Екінші кезеңге қатысу туралы толығырақ біз барлық 5000 қатысушыға жеке хабарлаймыз.', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});


// Все важные сроки олимпиады
bot.hears('Все важные сроки олимпиады', async(ctx) => {
    ctx.reply('Выберите интересующий вас вопрос:',
        Markup.keyboard([
            ['Когда будет проходить 1 этап олимпиады?'],
            ['Когда будут результаты 1 этапа?'],
            ['Когда будет проходить 2 этап олимпиады?'],
            ['Когда будут результаты 2 этапа? И как узнать статус победителей?'],
            ['Когда победителям можно подать заявку в поступление в специализированные школы для одоренных детей?'],
            ['Когда можно получить сертификат финалиста?'],
            ['Когда можно получить диплом победителя?'],
            ['Когда учителя могут получить благодарственные письма?'],
            ['На главную']
        ]).oneTime()
    );
    try {
        const userId = ctx.from.id;

        let MainDatesInstance = await MainDatesModel.findOne({});
        if (!MainDatesInstance) {
            // If no document is found, initialize with default values
            MainDatesInstance = new MainDatesModel();
        }

        if (!MainDatesInstance.uniqueUsers.includes(userId)) {
            await MainDatesInstance.updateOne({
                $inc: { 'phrases.Все важные сроки олимпиады': 1 },
                $addToSet: { uniqueUsers: userId }
            }, { upsert: true });
            console.log(`Count for "Все важные сроки олимпиады" updated in the database for user ${userId}.`);

            // Your logic for handling the specific phrase here
        } else {
            console.log(`User ${userId} already sent "Все важные сроки олимпиады".`);
        }
    } catch (error) {
        console.error('Error updating count for "Все важные сроки олимпиады":', error);
    }
});

bot.hears('Когда будет проходить 1 этап олимпиады?', (ctx) => {
    ctx.reply('1 этап олимпиады будет проходить с 1 по 11 апреля по всему Казахстану. Дата сдачи тестирования зависит от региона участника и тестирование можно проходить только в дни своего региона. С графиком тестирования можете ознакомиться ниже: \n' +
        '\n' +
        '1 апреля - Акмолинская, Павлодарская, Северо-Казахстанская область\n' +
        '2 апреля - Атырауская, Ұлытау, Жетісу\n' +
        '3 апреля - Восточно-Казахстанская, Жамбылская, Карагандинская\n' +
        '4 апреля - Туркестанская область (определенные районы: г. Арысь, Жетисайский р-н., Казыгуртский р-н., Келесский р-н., г. Кентау, Мактааральский р-н., Ордабасынский р-н., Отрарский р-н., р-н. Байдибека)\n' +
        '5 апреля - Туркестанская область (определенные районы: Сайрамский р-н., Сарыагашский р-н., р-н. Сауран, Сузакский р-н., Толебиский р-н., Тюлькубасский р-н.,  Шардаринский р-н.)\n' +
        '8 апреля - Западно-Казахстанская, Костанайская, Абай и определенные районы Алматинской области (Илийский р-н.)\n' +
        '9 апреля - Кызылординская и определенные районы Алматинской области (Балхашкий р-н., Енбекшиказахский р-н., Жамбылский р-н., Кегенский р-н., Қонаев г., Райымбекский р-н., Талгарский р-н., Уйгурский р-н.)\n' +
        '10 апреля - Мангыстауская область\n' +
        '11 апреля - Актюбинская область', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Когда будут результаты 1 этапа?', (ctx) => {
    ctx.reply('Результаты 1 этапа будут доступны в течение 14 календарных дней после завершения данного этапа во всех регионах. С результатами можно будет ознакомиться в личном кабинете каждого участника, в разделе "Уведомления". Список участников ІІ этапа олимпиады будет опубликован официальном сайте Олимпиады 1000bala.elumiti.kz/for-winners, также в социальных сетях и мы персонально уведомим участников через СМС уведомление.', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Когда будет проходить 2 этап олимпиады?', (ctx) => {
    ctx.reply('Даты проведения 2 этапа с 24 по 26 апреля. 2 этап будет проходить в региональных центрах тестирования Ustudy. Список участников ІІ этапа олимпиады будет опубликован официальном сайте Олимпиады 1000bala.elumiti.kz/for-winners, также в социальных сетях и мы персонально уведомим участников через СМС уведомление.', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Когда будут результаты 2 этапа? И как узнать статус победителей?', (ctx) => {
    ctx.reply('Результаты 2 этапа будут доступны в течение 14 календарных дней после завершения тестирования. С результатами можно будет ознакомиться в личном кабинете каждого участника, в разделе "Уведомления". Список победителей олимпиады будет опубликован официальном сайте Олимпиады 1000bala.elumiti.kz/for-winners, также в социальных сетях и мы персонально уведомим участников через СМС уведомление.', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Когда победителям можно подать заявку в поступление в специализированные школы для одоренных детей?', (ctx) => {
    ctx.reply('Победители Олимпиады смогут подать одну заявку в одну специализированную школу для одаренных детей (БИЛ, Дарын, РФМШ) после объявления результатов с 15 мая согласно графику 2024 года в Личном кабинете на сайте Олимпиады.', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Когда можно получить сертификат финалиста?', (ctx) => {
    ctx.reply('Финалисты олимпиады получат сертификат ориентировочно в 20 числах мая 2024 года.', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Когда можно получить диплом победителя?', (ctx) => {
    ctx.reply('Победители олимпиады получат димлом ориентировочно в 20 числах мая 2024 года.', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Когда учителя могут получить благодарственные письма?', (ctx) => {
    ctx.reply('Учителя подготовившие финалистов и победителей олимпиады получат сертификат ориентировочно в 20 числах мая 2024 года.', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});

// Олимпиаданың барлық маңызды мерзімдері
bot.hears('Олимпиаданың барлық маңызды мерзімдері', async (ctx) => {
    ctx.reply('Сізді қызықтыратын сұрақты таңдаңыз:',
        Markup.keyboard([
            ['Олимпиаданың 1 кезеңі қашан өтеді?'],
            ['1 кезеңнің нәтижелері қашан болады?'],
            ['Олимпиаданың 2 кезеңі қашан өтеді?'],
            ['2 кезеңнің нәтижелері қашан болады?'],
            ['Жеңімпаздар дарынды балаларға арналған мектептерге қашан сұраныс бере алады?'],
            ['Финалист сертификатын қашан алуға болады?'],
            ['Жеңімпаз дипломын қашан алуға болады?'],
            ['Мұғалімдер алғыс хаттарды қашан ала алады?'],
            ['Басты бетке']
        ]).oneTime()
    );
    try {
        const userId = ctx.from.id;

        let MainDatesInstanceKZ = await MainDatesModelKZ.findOne({});
        if (!MainDatesInstanceKZ) {
            // If no document is found, initialize with default values
            MainDatesInstanceKZ = new MainDatesModelKZ();
        }

        if (!MainDatesInstanceKZ.uniqueUsers.includes(userId)) {
            await MainDatesInstanceKZ.updateOne({
                $inc: { 'phrases.Олимпиаданың барлық маңызды мерзімдері': 1 },
                $addToSet: { uniqueUsers: userId }
            }, { upsert: true });
            console.log(`Count for "Олимпиаданың барлық маңызды мерзімдері" updated in the database for user ${userId}.`);

            // Your logic for handling the specific phrase here
        } else {
            console.log(`User ${userId} already sent "Олимпиаданың барлық маңызды мерзімдері".`);
        }
    } catch (error) {
        console.error('Error updating count for "Олимпиаданың барлық маңызды мерзімдері":', error);
    }
});

bot.hears('Олимпиаданың 1 кезеңі қашан өтеді?', (ctx) => {
    ctx.reply('Олимпиаданың 1 кезеңі бүкіл Қазақстан бойынша 1-11 сәуір аралығында өтеді. Сынақтама тапсыру күні қатысушының аймағына байланысты. Тестілеуді тек өз аймағына сай күндерінде тапсыруға болады.\n' +
        '\n' +
        'Тестілеу кестесімен төменде танысуға болады:\n' +
        '1 сәуір - Ақмола, Павлодар, Солтүстік Қазақстан облыстары\n' +
        '2 сәуір - Атырау, Ұлытау, Жетісу облыстары\n' +
        '3 сәуір - Шығыс Қазақстан, Жамбыл, Қарағанды облыстары\n' +
        '4 сәуір - Түркістан облысы (белгілі бір аудандар: Арыс қ., Жетісай ауд., Қазығұрт ауд., Келес ауд., Кентау қ., Мақтаарал ауд., Ордабасы ауд., Отырар ауд., Бәйдібек ауд.)\n' +
        '5 сәуір - Түркістан облысы (белгілі бір аудандар: Сайрам ауд., Сарыағаш ауд., Сауран ауд., Созақ ауд., Төле би ауд., Түлкібас ауд., Шардара ауд.)\n' +
        '8 сәуір - Батыс Қазақстан, Қостанай, Абай облыстары және Алматы облысының белгілі бір аудандары (Іле ауданы)\n' +
        '9 сәуір - Қызылорда облысы мен Алматы облысының белгілі бір аудандары (Қарасай ауд., Балқаш ауд., Еңбекшіқазақ ауд., Жамбыл ауд., Кеген ауд., Қонаев қ., Райымбек ауд., Талғар ауд., Ұйғыр ауд.)\n' +
        '10 сәуір - Маңғыстау облысы\n' +
        '11 сәуір - Ақтөбе облысы', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('1 кезеңнің нәтижелері қашан болады?', (ctx) => {
    ctx.reply('І кезеңнің нәтижелері барлық облыстағы кезең аяқталғаннан кейін 14 күн ішінде қолжетімді болады. Нәтижелермен әр қатысушының жеке кабинетінде, "хабарламалар" бөлімінде танысуға болады. Олимпиаданың ІІ кезеңіне қатысушылардың тізімі Олимпиаданың ресми сайтында 1000bala.elumiti.kz/for-winners  жарияланады. Сондай-ақ әлеуметтік желілерде және біз қатысушыларға SMS хабарлама арқылы жеке хабар етеміз.', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('Олимпиаданың 2 кезеңі қашан өтеді?', (ctx) => {
    ctx.reply('"2 кезеңді өткізу күндері: 24-26 сәуір аралығында. 2 кезең Ustudy аймақтық тестілеу орталықтарында өтеді. \n' +
        'Олимпиаданың ІІ кезеңіне қатысушылардың тізімі Олимпиаданың ресми сайтында 1000bala.elumiti.kz/for-winners жарияланады. Сондай-ақ әлеуметтік желілерде және біз қатысушыларға SMS хабарлама арқылы жеке хабар етеміз."', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('2 кезеңнің нәтижелері қашан болады?', (ctx) => {
    ctx.reply('2 кезеңнің нәтижелері тестілеу аяқталғаннан кейін 14 күнтізбелік күн ішінде қол жетімді болады. Нәтижелермен Олимпиаданың ресми сайтында 1000bala.elumiti.kz/for-winners жарияланады. Сондай-ақ әлеуметтік желілерде және біз қатысушыларға SMS хабарлама арқылы жеке хабар етеміз.', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('Жеңімпаздар дарынды балаларға арналған мектептерге қашан сұраныс бере алады?', (ctx) => {
    ctx.reply('Нәтижелер жарияланғаннан кейін олимпиада жеңімпаздары 2024 жылғы кестеге сәйкес 15 мамырдан бастап дарынды балаларға арналған бір мамандандырылған мектепке (БИЛ, Дарын, РФМШ) өтінім бере алады.', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('Финалист сертификатын қашан алуға болады?', (ctx) => {
    ctx.reply('Олимпиада финалистері сертификатты шамамен 2024 жылдың 20 мамырында ала алады.', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('Жеңімпаз дипломын қашан алуға болады?', (ctx) => {
    ctx.reply('Олимпиада жеңімпаздары сертификатты шамамен 2024 жылдың 20 мамырында ала алады.', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('Мұғалімдер алғыс хаттарды қашан ала алады?', (ctx) => {
    ctx.reply('Олимпиаданың финалистерді мен жеңімпаздарды дайындаған мұғалімдер сертификатты шамамен 2024 жылдың 20 мамырында ала алады.', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});


// Не помню логин от личного кабинета
bot.hears('Не помню логин от личного кабинета', async (ctx) => {
    ctx.reply('Если вы не помните телефонный номер, который использовался в качестве логина, то: \n' +
        'Обратитесь в колл центр по номеру 87273100258 или напишите по ссылке в чат https://jivo.chat/UoLJfeceLg\n' +
        'Будьте готовы сообщить специалисту ИИН, чтобы узнать логин/тел.номер', Markup.keyboard([
        ['На главную']
    ]).oneTime());
    try {
        const userId = ctx.from.id;

        let ForgotLoginInstance = await ForgotLoginModel.findOne({});
        if (!ForgotLoginInstance) {
            // If no document is found, initialize with default values
            ForgotLoginInstance = new ForgotLoginModel();
        }

        if (!ForgotLoginInstance.uniqueUsers.includes(userId)) {
            await ForgotLoginInstance.updateOne({
                $inc: { 'phrases.Не помню логин от личного кабинета': 1 },
                $addToSet: { uniqueUsers: userId }
            }, { upsert: true });
            console.log(`Count for "Не помню логин от личного кабинета" updated in the database for user ${userId}.`);

            // Your logic for handling the specific phrase here
        } else {
            console.log(`User ${userId} already sent "Не помню логин от личного кабинета".`);
        }
    } catch (error) {
        console.error('Error updating count for "Не помню логин от личного кабинета":', error);
    }
});
// Жеке кабинетінің логині есімде жоқ
bot.hears('Жеке кабинетінің логині есімде жоқ', async (ctx) => {
    ctx.reply('Егер сіз логин ретінде пайдаланылған телефон нөмірі есіңізде жоқ болса, онда:\n' +
        ' 87273100258 нөмірі арқылы байланыс орталығына хабарласыңыз немесе сілтеме арқылы чатқа жазыңыз https://jivo.chat/UoLJfeceLg\n' +
        'ЖСН-ді қызметкерге хабарлауға дайын болыңыз', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
    try {
        const userId = ctx.from.id;

        let ForgotLoginInstanceKZ = await ForgotLoginModelKZ.findOne({});
        if (!ForgotLoginInstanceKZ) {
            // If no document is found, initialize with default values
            ForgotLoginInstanceKZ = new ForgotLoginModelKZ();
        }

        if (!ForgotLoginInstanceKZ.uniqueUsers.includes(userId)) {
            await ForgotLoginInstanceKZ.updateOne({
                $inc: { 'phrases.Жеке кабинетінің логині есімде жоқ': 1 },
                $addToSet: { uniqueUsers: userId }
            }, { upsert: true });
            console.log(`Count for "Жеке кабинетінің логині есімде жоқ" updated in the database for user ${userId}.`);

            // Your logic for handling the specific phrase here
        } else {
            console.log(`User ${userId} already sent "Жеке кабинетінің логині есімде жоқ".`);
        }
    } catch (error) {
        console.error('Error updating count for "Жеке кабинетінің логині есімде жоқ":', error);
    }
});

// Не помню пароль от личного кабинета или не могу войти в личный кабинет
bot.hears('Не помню пароль от личного кабинета или не могу войти в личный кабинет', async (ctx) => {
    ctx.reply('Выберите подходящую проблему из списка', Markup.keyboard([
        ['Не помню пароль, выходит "Неправильный пароль"'],
        ['Не могу войти в личный кабинет, выходит "Авторизация невозможна"'],
        ['Не могу войти в личный кабинет, выходит "Пользователь не зарегистрирован"'],
        ['Не могу войти в личный кабинет - Другое'],
        ['На главную']
    ]).oneTime());
    try {
        const userId = ctx.from.id;

        let ForgotPasswordInstance = await ForgotPasswordModel.findOne({});
        if (!ForgotPasswordInstance) {
            // If no document is found, initialize with default values
            ForgotPasswordInstance = new ForgotPasswordModel();
        }

        if (!ForgotPasswordInstance.uniqueUsers.includes(userId)) {
            await ForgotPasswordInstance.updateOne({
                $inc: { 'phrases.Не помню пароль от личного кабинета или не могу войти в личный кабинет': 1 },
                $addToSet: { uniqueUsers: userId }
            }, { upsert: true });
            console.log(`Count for "Не помню пароль от личного кабинета или не могу войти в личный кабинет" updated in the database for user ${userId}.`);

            // Your logic for handling the specific phrase here
        } else {
            console.log(`User ${userId} already sent "Не помню пароль от личного кабинета или не могу войти в личный кабинет".`);
        }
    } catch (error) {
        console.error('Error updating count for "Не помню пароль от личного кабинета или не могу войти в личный кабинет":', error);
    }
});
bot.hears('Не помню пароль, выходит "Неправильный пароль"', (ctx) => {
    ctx.reply('1. Перейтите по ссылке 1000bala.elumiti.kz/forget-password \n' +
        '2. Выберите способ востановления пароля через SMS код\n' +
        '3. Введите телефонный номер, который указывали при регистрации и выберите пользователя (ФИО)\n' +
        '4. Введите полученный код и установите новый пароль', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});

// Не могу войти в личный кабинет, выходит "Авторизация невозможна"
bot.hears('Не могу войти в личный кабинет, выходит "Авторизация невозможна"', (ctx) => {
    ctx.reply('"1. Убедитесь, что вы находитесь на нашем официальном сайте 1000bala.elumiti.kz\n' +
        '2. Убедитесь, что вы хотете войти в личный кабинет в день сдачи тестирования своего региона. В дни тестирования других регионов вы не сможете авторизоваться и сдать тест.\n' +
        '3. Убедитесь в правильности вашего логина и пароля."', Markup.keyboard([
        ['На главную'],
        ['Посмотреть график тестирования всех регионов']
    ]).oneTime());
});
bot.hears('Посмотреть график тестирования всех регионов', async (ctx) => {
    await ctx.reply('1 этап олимпиады будет проходить с 1 по 11 апреля по всему Казахстану. Дата сдачи тестирования зависит от региона участника и тестирование можно проходить только в дни своего региона. С графиком тестирования можете ознакомиться ниже: \n' +
        '\n' +
        '1 апреля - Акмолинская, Павлодарская, Северо-Казахстанская область\n' +
        '2 апреля - Атырауская, Ұлытау, Жетісу\n' +
        '3 апреля - Восточно-Казахстанская, Жамбылская, Карагандинская\n' +
        '4 апреля - Туркестанская область (определенные районы: г. Арысь, Жетисайский р-н., Казыгуртский р-н., Келесский р-н., г. Кентау, Мактааральский р-н., Ордабасынский р-н., Отрарский р-н., р-н. Байдибека)\n' +
        '5 апреля - Туркестанская область (определенные районы: Сайрамский р-н., Сарыагашский р-н., р-н. Сауран, Сузакский р-н., Толебиский р-н., Тюлькубасский р-н.,  Шардаринский р-н.)\n' +
        '8 апреля - Западно-Казахстанская, Костанайская, Абай и определенные районы Алматинской области (Илийский р-н.)\n' +
        '9 апреля - Кызылординская и определенные районы Алматинской области (Балхашкий р-н., Енбекшиказахский р-н., Жамбылский р-н., Кегенский р-н., Қонаев г., Райымбекский р-н., Талгарский р-н., Уйгурский р-н.)\n' +
        '10 апреля - Мангыстауская область\n' +
        '11 апреля - Актюбинская область',
        Markup.keyboard([
            ['На главную']
        ]).oneTime()
    );
    await new Promise(resolve => setTimeout(resolve, 1000));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'WriteToTechHelp')
    ]));
});

// Не могу войти в личный кабинет, выходит "Пользователь не зарегистрирован"
bot.hears('Не могу войти в личный кабинет, выходит "Пользователь не зарегистрирован"', (ctx) => {
    ctx.reply('Убедитесь, что вы ввели правильно свой логин и пароль.', Markup.keyboard([
        ['Не помню логин'],
        ['Логин и пароль введены правильно'],
        ['На главную']
    ]).oneTime());
});
bot.hears('Не помню логин', (ctx) => {
    ctx.reply('Если вы не помните телефонный номер, который использовался в качестве логина, то: \n' +
        'Обратитесь в колл центр по номеру 87273100258 или напишите по ссылке в чат https://jivo.chat/UoLJfeceLg\n' +
        'Будьте готовы сообщить специалисту ИИН, чтобы узнать логин/тел.номер', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});
bot.hears('Логин и пароль введены правильно', async (ctx) => {
    await ctx.reply('Рекомендуем очистить кэш и куки вашего браузера: \n' +
        '\n' +
        '1. Нажмите комбинацию клавиш Ctrl+F5 (если у вас компьютер) или Ctrl+Shift+Delete (если у вас ноутбук). \n' +
        '2. В вышедшем окне выберите временной диапазон ""Все время"" и проставьте галочки в сточках:\n' +
        '    - Файлы сохраненные в кеше\n' +
        '    - Файлы cookie и другие данные сайтов\n' +
        '3. Нажмите на ""Удалить данные"" и обновите сайт олимпиады 1000bala.elumiti.kz, повторите попытку входа в личный кабинет',
        Markup.keyboard([
            ['На главную']
        ]).oneTime()
    );
    await new Promise(resolve => setTimeout(resolve, 1000));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'WriteToTechHelp')
    ]));
});

// Не могу войти в личный кабинет - Другое
bot.hears('Не могу войти в личный кабинет - Другое', (ctx) => {
    ctx.reply('Обратитесь в колл центр по номеру 87273100258 или напишите по ссылке в чат https://jivo.chat/UoLJfeceLg \n' +
        'Будьте готовы сообщить специалисту ИИН', Markup.keyboard([
        ['На главную']
    ]).oneTime());
});

// Жеке кабинеттің құпия сөзі есімде жоқ немесе жеке кабинетке кіре алмаймын
bot.hears('Жеке кабинеттің құпия сөзі есімде жоқ немесе жеке кабинетке кіре алмаймын', async (ctx) => {
    ctx.reply('Тізімнен сәйкес мәселені таңдаңыз', Markup.keyboard([
        ['Құпия сөз есімде жоқ, "қате құпия сөз" қатесі шығады"'],
        ['Жеке кабинетке кіре алмаймын, "Авторизация мүмкін емес" қатесі шығады'],
        ['Жеке кабинетке кіре алмаймын, "пайдаланушы тіркелмеген" қатесі шығады'],
        ['Жеке кабинетке кіре алмаймын - басқа мәселе'],
        ['Басты бетке']
    ]).oneTime());
    try {
        const userId = ctx.from.id;

        let ForgotPasswordInstanceKZ = await ForgotPasswordModelKZ.findOne({});
        if (!ForgotPasswordInstanceKZ) {
            // If no document is found, initialize with default values
            ForgotPasswordInstanceKZ = new ForgotPasswordModelKZ();
        }

        if (!ForgotPasswordInstanceKZ.uniqueUsers.includes(userId)) {
            await ForgotPasswordInstanceKZ.updateOne({
                $inc: { 'phrases.Жеке кабинеттің құпия сөзі есімде жоқ немесе жеке кабинетке кіре алмаймын': 1 },
                $addToSet: { uniqueUsers: userId }
            }, { upsert: true });
            console.log(`Count for "Жеке кабинеттің құпия сөзі есімде жоқ немесе жеке кабинетке кіре алмаймын" updated in the database for user ${userId}.`);

            // Your logic for handling the specific phrase here
        } else {
            console.log(`User ${userId} already sent "Жеке кабинеттің құпия сөзі есімде жоқ немесе жеке кабинетке кіре алмаймын".`);
        }
    } catch (error) {
        console.error('Error updating count for "Жеке кабинеттің құпия сөзі есімде жоқ немесе жеке кабинетке кіре алмаймын":', error);
    }
});
bot.hears('Құпия сөз есімде жоқ, "қате құпия сөз" қатесі шығады"', (ctx) => {
    ctx.reply('1. 1000bala.elumiti.kz/forget-password Сілтемеге өтіңіз \n' +
        '2. SMS код арқылы құпия сөзді жаңадан шығару әдісін таңдаңыз\n' +
        '3. Тіркеу кезінде енгізілген телефон нөмірін толтырып, пайдаланушыны таңдаңыз (аты-жөні)\n' +
        '4.  Алынған кодты енгізіп, жаңа құпия сөзді орнатыңыз', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});

// Жеке кабинетке кіре алмаймын, "Авторизация мүмкін емес" қатесі шығады
bot.hears('Жеке кабинетке кіре алмаймын, "Авторизация мүмкін емес" қатесі шығады', (ctx) => {
    ctx.reply('"1. Сіз біздің ресми сайтында болғанына қол жеткізіңіз 1000bala.elumiti.kz\n' +
        '2. Сіздің аймағыңызға сәйкес күнінде жеке кабинетке кіріп тұрғанызға көз жеткізіңіз. Басқа аймақтардың тестілеу күндерінде сіз жүйеге кіре алмайсыз және тест тапсыра алмайсыз.\n' +
        '3. Логин мен парольдің дұрыстығына көз жеткізіңіз."', Markup.keyboard([
        ['Басты бетке'],
        ['Барлық аймақтардың тестілеу кестесін қарау']
    ]).oneTime());
});
bot.hears('Барлық аймақтардың тестілеу кестесін қарау', async (ctx) => {
    await ctx.reply('Олимпиаданың 1 кезеңі бүкіл Қазақстан бойынша 1-11 сәуір аралығында өтеді. Сынақтама тапсыру күні қатысушының аймағына байланысты. Тестілеуді тек өз аймағына сай күндерінде тапсыруға болады.\n' +
        '\n' +
        'Тестілеу кестесімен төменде танысуға болады:\n' +
        '1 сәуір - Ақмола, Павлодар, Солтүстік Қазақстан облыстары\n' +
        '2 сәуір - Атырау, Ұлытау, Жетісу облыстары\n' +
        '3 сәуір - Шығыс Қазақстан, Жамбыл, Қарағанды облыстары\n' +
        '4 сәуір - Түркістан облысы (белгілі бір аудандар: Арыс қ., Жетісай ауд., Қазығұрт ауд., Келес ауд., Кентау қ., Мақтаарал ауд., Ордабасы ауд., Отырар ауд., Бәйдібек ауд.)\n' +
        '5 сәуір - Түркістан облысы (белгілі бір аудандар: Сайрам ауд., Сарыағаш ауд., Сауран ауд., Созақ ауд., Төле би ауд., Түлкібас ауд., Шардара ауд.)\n' +
        '8 сәуір - Батыс Қазақстан, Қостанай, Абай облыстары және Алматы облысының белгілі бір аудандары (Іле ауданы)\n' +
        '9 сәуір - Қызылорда облысы мен Алматы облысының белгілі бір аудандары (Қарасай ауд., Балқаш ауд., Еңбекшіқазақ ауд., Жамбыл ауд., Кеген ауд., Қонаев қ., Райымбек ауд., Талғар ауд., Ұйғыр ауд.)\n' +
        '10 сәуір - Маңғыстау облысы\n' +
        '11 сәуір - Ақтөбе облысы',
        Markup.keyboard([
            ['Басты бетке']
        ]).oneTime()
    );
    await new Promise(resolve => setTimeout(resolve, 1000));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'WriteToTechHelpKZ')
    ]));
});
// Не могу войти в личный кабинет, выходит "Пользователь не зарегистрирован"
bot.hears('Жеке кабинетке кіре алмаймын, "пайдаланушы тіркелмеген" қатесі шығады', (ctx) => {
    ctx.reply('Ресми сайтта(1000bala.elumiti.kz) логин мен құпия сөзді дұрыс енгізгеніңізге көз жеткізіңіз ', Markup.keyboard([
        ['Логин есімде жоқ'],
        ['Логин мен пароль дұрыс енгізілген'],
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('Логин есімде жоқ', (ctx) => {
    ctx.reply('Егер сіз логин ретінде пайдаланылған телефон нөмірі есіңізде жоқ болса, онда:\n' +
        ' 87273100258 нөмірі арқылы байланыс орталығына хабарласыңыз немесе сілтеме арқылы чатқа жазыңыз https://jivo.chat/UoLJfeceLg\n' +
        'ЖСН-ді қызметкерге хабарлауға дайын болыңыз', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});
bot.hears('Логин мен пароль дұрыс енгізілген', async (ctx) => {
    await ctx.reply('Браузердің кэш пен куки тазалауды ұсынамыз:\n' +
        '\n' +
        '1. Ctrl+F5 (егер сізде компьютер болса) немесе Ctrl+Shift+Delete (егер сізде ноутбук болса) пернелер тіркесімін басыңыз.\n' +
        '2. Пайда болған терезеде ""барлық уақытта"" уақыт диапазонын таңдап, келесі жолдарға құсбелгісін қойыңыз:\n' +
        '- - Кэште сақталған файлдар\n' +
        '- Cookie файлдары және сайттың басқа деректері\n' +
        '3. ""Деректерді жою"" түймесін басып, олимпиада сайтын (1000bala.elumiti.kz) жаңартыңыз. Жеке кабинетке кіруін қайталаңыз',
        Markup.keyboard([
            ['Басты бетке']
        ]).oneTime()
    );
    await new Promise(resolve => setTimeout(resolve, 1000));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'WriteToTechHelpKZ')
    ]));
});
// Не могу войти в личный кабинет - Другое
bot.hears('Жеке кабинетке кіре алмаймын - басқа мәселе', (ctx) => {
    ctx.reply('87273100258 нөмірі арқылы байланыс орталығына хабарласыңыз немесе сілтеме арқылы чатқа жазыңыз https://jivo.chat/UoLJfeceLg\n' +
        'ЖСН-ді қызметкерге хабарлауға дайын болыңыз', Markup.keyboard([
        ['Басты бетке']
    ]).oneTime());
});

// Как начать тест
bot.hears('Как начать тест?', async (ctx) => {
    // Send a message with a button
    await ctx.reply('Пошаговая инструкция по тестированию доступна у вас в личном кабинете с наглядными иллюстрациями.', Markup.inlineKeyboard([
        Markup.button.callback('Далее', 'nextHowToStartTest_step_illustrations'),
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
    try {
        const userId = ctx.from.id;

        let HowToStartInstance = await HowToStartModel.findOne({});
        if (!HowToStartInstance) {
            // If no document is found, initialize with default values
            HowToStartInstance = new HowToStartModel();
        }

        if (!HowToStartInstance.uniqueUsers.includes(userId)) {
            await HowToStartInstance.updateOne({
                $inc: { 'phrases.Как начать тест?': 1 },
                $addToSet: { uniqueUsers: userId }
            }, { upsert: true });
            console.log(`Count for "Как начать тест?" updated in the database for user ${userId}.`);

            // Your logic for handling the specific phrase here
        } else {
            console.log(`User ${userId} already sent "Как начать тест?".`);
        }
    } catch (error) {
        console.error('Error updating count for "Как начать тест?":', error);
    }
});
bot.action('nextHowToStartTest_step_illustrations', async (ctx) => {
    await ctx.reply('1. Зайдите на наш официальный сайт 1000bala.elumiti.kz\n' +
        '2. Тест можно сдать только через ноутбук или компьютер с веб-камерой, так как работает система прокторинг - проверка академической честности \n' +
        '3. Тест можно сдать только в дни проведения тестирования именно вашего региона. Ознакомьтесь с календарем тестирования', Markup.inlineKeyboard([
        Markup.button.callback('Календарь тестирования', 'nextHowToStartTest_step_illustrations2'),
        Markup.button.callback('Далее', 'nextHowToStartTest_step_illustrations3'),
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});
bot.action('toHomePageRU', sendWelcomeMessageRu);
bot.action('nextHowToStartTest_step_illustrations2', async (ctx) => {
    await ctx.reply('1 этап олимпиады будет проходить с 1 по 11 апреля по всему Казахстану. Дата сдачи тестирования зависит от региона участника и тестирование можно проходить только в дни своего региона. С графиком тестирования можете ознакомиться ниже: \n' +
        '\n' +
        '1 апреля - Акмолинская, Павлодарская, Северо-Казахстанская область\n' +
        '2 апреля - Атырауская, Ұлытау, Жетісу\n' +
        '3 апреля - Восточно-Казахстанская, Жамбылская, Карагандинская\n' +
        '4 апреля - Туркестанская область (определенные районы: г. Арысь, Жетисайский р-н., Казыгуртский р-н., Келесский р-н., г. Кентау, Мактааральский р-н., Ордабасынский р-н., Отрарский р-н., р-н. Байдибека)\n' +
        '5 апреля - Туркестанская область (определенные районы: Сайрамский р-н., Сарыагашский р-н., р-н. Сауран, Сузакский р-н., Толебиский р-н., Тюлькубасский р-н.,  Шардаринский р-н.)\n' +
        '8 апреля - Западно-Казахстанская, Костанайская, Абай и определенные районы Алматинской области (Илийский р-н.)\n' +
        '9 апреля - Кызылординская и определенные районы Алматинской области (Балхашкий р-н., Енбекшиказахский р-н., Жамбылский р-н., Кегенский р-н., Қонаев г., Райымбекский р-н., Талгарский р-н., Уйгурский р-н.)\n' +
        '10 апреля - Мангыстауская область\n' +
        '11 апреля - Актюбинская область', Markup.inlineKeyboard([
        Markup.button.callback('Назад', 'nextHowToStartTest_step_illustrations'),
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations3', async (ctx) => {
    await ctx.reply('Для начала убедитесь, что у вас компьютер или ноутбук на базе ОС Windows (предпочтительно) или Mac. \n' +
        'Соответствует техническим требованиям для системы тестирования:\n' +
        '• 4 Гб оперативной памяти;\n' +
        '• наличие веб-камеры (проверить подключение к системному блоку) - если компьютер\n' +
        '• наличие работоспособной камеры - если ноутбук\n' +
        '• наличии стабильного интернет-соединения не менее 1 Мбит/сек на 1 рабочее место;\n' +
        '• последние актуальные версии рекомендуемых браузеров Google Chrome, Mozilla Firefox, Opera, Yandex.', Markup.inlineKeyboard([
        Markup.button.callback('Проверить скорость интернет-соединения', 'nextHowToStartTest_step_illustrations4'),
        Markup.button.callback('Далее', 'nextHowToStartTest_step_illustrations5'),
        Markup.button.callback('Назад', 'nextHowToStartTest_step_illustrations'),
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations4', async (ctx) => {
    await ctx.reply('Скорость интернет-соединения можно проверить с помощью сайта speedtest.net Показатель скорости интернет-соединения должен быть не менее 1 мегабита в секунду.', Markup.inlineKeyboard([
        Markup.button.callback('Назад', 'nextHowToStartTest_step_illustrations3'),
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations5', async (ctx) => {
    await ctx.reply('Войдите в личный кабинет на сайте 1000bala.elumiti.kz:\n' +
        '1. Введите номер телефона/логин, который указали при регистрации\n' +
        '2. Выберите пользователя - ФИО\n' +
        '3. Введите пароль  \n' +
        'Нажмите на кнопку "Войти"', Markup.inlineKeyboard([
        Markup.button.callback('Далее', 'nextHowToStartTest_step_illustrations6'),
        Markup.button.callback('Назад', 'nextHowToStartTest_step_illustrations3'),
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations6', async (ctx) => {
    await ctx.reply('Далее: \n' +
        'В личном кабинете перейдите в раздел ""Тестирование"".\n' +
        'Выберите язык, на котором хотите проходить тестирование\n' +
        'В отображаемом тесте нажмите на кнопку ""Начать тестирование"", чтобы приступить к тесту', Markup.inlineKeyboard([
        Markup.button.callback('Далее', 'nextHowToStartTest_step_illustrations7'),
        Markup.button.callback('Назад', 'nextHowToStartTest_step_illustrations5'),
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations7', async (ctx) => {
    await ctx.reply('У вас на экране появятся правила тестирования с прокторингом, внимательно изучите правила - ведь нарушение правил приведет к дисквалификации. \n' +
        '\n' +
        'Предоставьте доступ к демонстрации вашего рабочего стола - выберите ""весь экран"" и нажмите на ""поделиться""\n' +
        '\n' +
        'Предоставьте доступ на использование камеры - нажмите на ""разрешить""\n' +
        '\n' +
        'Нажмите на кнопку "Слудующий шаг"', Markup.inlineKeyboard([
        Markup.button.callback('Далее', 'nextHowToStartTest_step_illustrations8'),
        Markup.button.callback('Назад', 'nextHowToStartTest_step_illustrations6'),
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations8', async (ctx) => {
    await ctx.reply('Сделайте фотографию, чтобы подтвердить вашу личность\n' +
        'В случае успешного подтверждения личности нажмите на "Продолжить"', Markup.inlineKeyboard([
        Markup.button.callback('Далее', 'nextHowToStartTest_step_illustrations9'),
        Markup.button.callback('Назад', 'nextHowToStartTest_step_illustrations7'),
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations9', async (ctx) => {
    await ctx.reply('На вашем экране появится информация о тесте: о структуре теста и о тайминге. Внимательно ознакомьтесь и после нажмите на кнопку "Начать тест"', Markup.inlineKeyboard([
        Markup.button.callback('Далее', 'nextHowToStartTest_step_illustrations10'),
        Markup.button.callback('Назад', 'nextHowToStartTest_step_illustrations8'),
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations10', async (ctx) => {
    await ctx.reply('Внимательно ознакомьтесь с вопросами теста и предоставьте ответ из 4 предложенных. Таким образом далее продвигайтесь по тесту используя навигацию на сайте. Желаем удачи!', Markup.inlineKeyboard([
        Markup.button.callback('Назад', 'nextHowToStartTest_step_illustrations9'),
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});

// Тестті қалай бастауға болады?
bot.hears('Тестті қалай бастауға болады?', async (ctx) => {
    // Send a message with a button
    await ctx.reply('Тестілеу бойынша қадамдық нұсқаулық сіздің жеке кабинетіңізде иллюстрациялармен көрсетілген.', Markup.inlineKeyboard([
        Markup.button.callback('Келесі', 'nextHowToStartTest_step_illustrationsKz'),
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
    try {
        const userId = ctx.from.id;

        let HowToStartInstanceKZ = await HowToStartModelKZ.findOne({});
        if (!HowToStartInstanceKZ) {
            // If no document is found, initialize with default values
            HowToStartInstanceKZ = new HowToStartModelKZ();
        }

        if (!HowToStartInstanceKZ.uniqueUsers.includes(userId)) {
            await HowToStartInstanceKZ.updateOne({
                $inc: { 'phrases.Тестті қалай бастауға болады?': 1 },
                $addToSet: { uniqueUsers: userId }
            }, { upsert: true });
            console.log(`Count for "Тестті қалай бастауға болады?" updated in the database for user ${userId}.`);

            // Your logic for handling the specific phrase here
        } else {
            console.log(`User ${userId} already sent "Тестті қалай бастауға болады?".`);
        }
    } catch (error) {
        console.error('Error updating count for "Тестті қалай бастауға болады?":', error);
    }
});
bot.action('nextHowToStartTest_step_illustrationsKz', async (ctx) => {
    await ctx.reply('1. Біздің ресми сайтына 1000bala.elumiti.kz кіріңіз\n' +
        '2. Академиялық адалдықты тексеру мақсатында прокторинг жүйесі қолданылады. Сондықтан тек ноутбук немесе веб-камерасы бар компьютер арқылы қатысуға болады..\n' +
        '3. Тестті тек сіздің аймағыңызына сай тестілеу күнінде ғана тапсыруға болады. Басқа аймақтардың тестілеу күндерінде сіз жүйеге кіре алмайсыз және тест тапсыра алмайсыз. Тестілеу күнтізбесін қараңыз', Markup.inlineKeyboard([
        Markup.button.callback('Тестілеу күнтізбесі', 'nextHowToStartTest_step_illustrations2Kz'),
        Markup.button.callback('Келесі', 'nextHowToStartTest_step_illustrations3Kz'),
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});
bot.action('toHomePageKZ', sendWelcomeMessageKz);
bot.action('nextHowToStartTest_step_illustrations2Kz', async (ctx) => {
    await ctx.reply('1 сәуір - Ақмола, Павлодар, Солтүстік Қазақстан облыстары\n' +
        '2 сәуір - Атырау, Ұлытау, Жетісу облыстары\n' +
        '3 сәуір - Шығыс Қазақстан, Жамбыл, Қарағанды облыстары\n' +
        '4 сәуір - Түркістан облысы (белгілі бір аудандар: Арыс қ., Жетісай ауд., Қазығұрт ауд., Келес ауд., Кентау қ., Мақтаарал ауд., Ордабасы ауд., Отырар ауд., Бәйдібек ауд.)\n' +
        '5 сәуір - Түркістан облысы (белгілі бір аудандар: Сайрам ауд., Сарыағаш ауд., Сауран ауд., Созақ ауд., Төле би ауд., Түлкібас ауд., Шардара ауд.)\n' +
        '8 сәуір - Батыс Қазақстан, Қостанай, Абай облыстары және Алматы облысының белгілі бір аудандары (Іле ауданы)\n' +
        '9 сәуір - Қызылорда облысы мен Алматы облысының белгілі бір аудандары (Қарасай ауд., Балқаш ауд., Еңбекшіқазақ ауд., Жамбыл ауд., Кеген ауд., Қонаев қ., Райымбек ауд., Талғар ауд., Ұйғыр ауд.)\n' +
        '10 сәуір - Маңғыстау облысы\n' +
        '11 сәуір - Ақтөбе облысы', Markup.inlineKeyboard([
        Markup.button.callback('Артқа қайту', 'nextHowToStartTest_step_illustrationsKz'),
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations3Kz', async (ctx) => {
    await ctx.reply('Біріншіден Сізде Windows немесе Mac OS негізіндегі компьютер немесе ноутбук бар екеніне және тестілеу жүйесінің техникалық талаптарына сәйкес келетініне көз жеткізіңіз:\n' +
        '• 4 Гб жедел жады (RAM);\n' +
        '• жұмыс істейтін веб-камераның болуы (жүйелік блокқа қосылуды тексеріңіз)\n' +
        '• 1 жұмыс орнына кемінде 1 Мбит/сек тұрақты интернет байланысы бар болуы;\n' +
        '• ұсынылған браузерлердің соңғы жаңартылған нұсқалары - Google Chrome, Mozilla Firefox, Opera, Yandex.', Markup.inlineKeyboard([
        Markup.button.callback('Интернет жылдамдығын тексеру', 'nextHowToStartTest_step_illustrations4Kz'),
        Markup.button.callback('Келесі', 'nextHowToStartTest_step_illustrations5Kz'),
        Markup.button.callback('Артқа қайту', 'nextHowToStartTest_step_illustrationsKz'),
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations4Kz', async (ctx) => {
    await ctx.reply('Интернет жылдамдығын speedtest.net сайт арқылы тексеруге болады.  Интернетке қосылу жылдамдығының көрсеткіштері кемінде 1 мегабит/с болуы керек.', Markup.inlineKeyboard([
        Markup.button.callback('Артқа қайту', 'nextHowToStartTest_step_illustrations3Kz'),
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations5Kz', async (ctx) => {
    await ctx.reply('1000bala.elumiti.kz сайтында жеке кабинетке кіріңіз.\n' +
        '1. Тіркелу  кезінде енгізілген телефон нөмірін/логинді толтырыныз.\n' +
        '2. Пайдаланушыны таңдаңыз (аты-жөні)\n' +
        '3. Құпия сөзді енгізіңіз\n' +
        '"Кіру" түймесін басыңыз', Markup.inlineKeyboard([
        Markup.button.callback('Келесі', 'nextHowToStartTest_step_illustrations6Kz'),
        Markup.button.callback('Артқа қайту', 'nextHowToStartTest_step_illustrations3Kz'),
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations6Kz', async (ctx) => {
    await ctx.reply('Жеке кабинетте ""тестілеу"" бөліміне өтіңіз.\n' +
        'Сынақтаманы өтуге қалаулы тілді таңдаңыз\n' +
        'Көрсетілген мәтінде""тестті бастау"" батырмасын басыңыз', Markup.inlineKeyboard([
        Markup.button.callback('Келесі', 'nextHowToStartTest_step_illustrations7Kz'),
        Markup.button.callback('Артқа қайту', 'nextHowToStartTest_step_illustrations5Kz'),
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations7Kz', async (ctx) => {
    await ctx.reply('Экранда прокторингпен тестілеу ережелері болады. Ережелерді мұқият оқып шығыңыз - ережелерді бұзу дисквалификацияға әкеледі.\n' +
        '\n' +
        'Компьютер жұмыс үстелінің демонстрациясына қол жеткізуге рұқсат беріңіз - "бүкіл экран" таңдап, "бөлісу" түймесін басыңыз\n' +
        '\n' +
        'Камераны пайдалануға рұқсат беріңіз - "рұқсат ету" түймесін басыңыз\n' +
        '\n' +
        '"Келесі қадам" түймесін басыңыз', Markup.inlineKeyboard([
        Markup.button.callback('Келесі', 'nextHowToStartTest_step_illustrations8Kz'),
        Markup.button.callback('Артқа қайту', 'nextHowToStartTest_step_illustrations6Kz'),
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations8Kz', async (ctx) => {
    await ctx.reply('Жеке басыңызды растау үшін өзіңізді суретке түсіріңіз\n' +
        'Жеке басын растау сәтті болған жағдайда "жалғастыру" түймесін басыңыз', Markup.inlineKeyboard([
        Markup.button.callback('Келесі', 'nextHowToStartTest_step_illustrations9Kz'),
        Markup.button.callback('Артқа қайту', 'nextHowToStartTest_step_illustrations7Kz'),
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations9Kz', async (ctx) => {
    await ctx.reply('Экранда тест туралы ақпарат пайда болады: тест құрылымы және уақыт шектеулігі жайында. Мұқият оқып, содан кейін "Тестті бастау" батырмасын басыңыз', Markup.inlineKeyboard([
        Markup.button.callback('Келесі', 'nextHowToStartTest_step_illustrations10Kz'),
        Markup.button.callback('Артқа қайту', 'nextHowToStartTest_step_illustrations8Kz'),
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});
bot.action('nextHowToStartTest_step_illustrations10Kz', async (ctx) => {
    await ctx.reply('Тест сұрақтарын мұқият қарап шығыңыз және ұсынылған 4 нұсқадан дұрыс жауапты белгілеңіз. Сайттағы навигацияны қолдана отырып, мәтін бойынша алға жылжытыңыз. Сәттілік тілейміз!', Markup.inlineKeyboard([
        Markup.button.callback('Артқа қайту', 'nextHowToStartTest_step_illustrations9Kz'),
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});

// Технические неполадки - не могу сдать тест
bot.hears('Технические неполадки - не могу сдать тест', async (ctx) => {
    ctx.reply('Выберите конкретную проблему', Markup.keyboard([
        ['Нет доступных тестов'],
        ['После верификации прокторинга и входа в задания, не видно задания'],
        ['Показывает, что тест пройден, даже если не начинали тестирование'],
        ['После верификации и предоставления доступа к демонстации экрана идет сброс и обновление'],
        ['На этапе верификации при попытке сделать фотографию участника выходит "Ошибка"']
    ]).oneTime());
    try {
        const userId = ctx.from.id;

        let TechSupportInstance = await TechSupportModel.findOne({});
        if (!TechSupportInstance) {
            // If no document is found, initialize with default values
            TechSupportInstance = new TechSupportModel();
        }

        if (!TechSupportInstance.uniqueUsers.includes(userId)) {
            await TechSupportInstance.updateOne({
                $inc: { 'phrases.Технические неполадки - не могу сдать тест': 1 },
                $addToSet: { uniqueUsers: userId }
            }, { upsert: true });
            console.log(`Count for "Технические неполадки - не могу сдать тест" updated in the database for user ${userId}.`);

            // Your logic for handling the specific phrase here
        } else {
            console.log(`User ${userId} already sent "Технические неполадки - не могу сдать тест".`);
        }
    } catch (error) {
        console.error('Error updating count for "Технические неполадки - не могу сдать тест":', error);
    }
});
// Нет доступных тестов
bot.hears('Нет доступных тестов', async (ctx) => {
    await ctx.reply('Для устанения проблемы строго следовать следующим шагам: \n' +
        '\n' +
        '1. Необходимо очистить кэш и куки вашего браузера. Нажмите комбинацию клавиш Ctrl+F5 (если у вас компьютер) или Ctrl+Shift+Delete (если у вас ноутбук). \n' +
        '2. В вышедшем окне выберите временной диапазон "Все время" и проставьте галочки в сточках:\n' +
        '    - Файлы сохраненные в кеше\n' +
        '    - Файлы cookie и другие данные сайтов\n' +
        '3. Нажмите на "Удалить данные" и обновите сайт олимпиады 1000bala.elumiti.kz, проверьте доступность теста в личном кабинете');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'CheckDateTime')
    ]));
});
bot.action('RecHelpYes', async (ctx) => {
    await ctx.reply('Удачи на олимпиаде!)', Markup.inlineKeyboard([
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});
bot.action('CheckDateTime', async (ctx) => {
    await ctx.reply('Проверьте текущую/актуальную дату и время вашего компьютера или ноутбука. Совпадают ли они с актуальной датой и времем по Астане?', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'TryToReLogin'),
        Markup.button.callback('Нет', 'DateTimeIsIncorrect'),
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});
bot.action('DateTimeIsIncorrect', async (ctx) => {
    await ctx.reply('Если дата и время указано не правильно, то их нужно изменить в вашем компьютере или в ноутбуке. Для этого:\n' +
        '1. Перейдите в раздел Пуск>Параметры> Время и язык> Дата и время.\n' +
        '2. Отключите автоматическую установку часового пояса и вручную укажите часовой пояс UTC +05:00 (Кызылорда, Ашхабад, Ташкенд, Карачи, Екатеринбург)\n' +
        '3. Проверьте итоговый результат, время и дата должны быть актуальными по г. Астана. Если все верно указано, то обновите сайт олимпиады 1000bala.elumiti.kz, проверьте доступность теста в личном кабинете');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'TryToReLogin')
    ]));
});
bot.action('TryToReLogin', async (ctx) => {
    await ctx.reply('Попробуйте выйти из личного кабинета участника олимпиады 1000bala.elumiti.kz и заново зайти в личный кабинет.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'WriteToTechHelp')
    ]));
});
bot.action('WriteToTechHelp', async (ctx) => {
    await ctx.reply('Напишите нашим специалистам через чат по ссылке, мы вам поможем и будьте готовы предоставить свои данные (ИИН и тел.номер): \n' +
        'https://jivo.chat/UoLJfeceLg', Markup.inlineKeyboard([
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});


// После верификации прокторинга и входа в задания, не видно задания
bot.hears('После верификации прокторинга и входа в задания, не видно задания', async (ctx) => {
    await ctx.reply('У вас идет загрузка задания. \n' +
        'Шаг 1. Нужно проверить интернет соединение, оно должно быть стабильным. \n' +
        'Шаг 2. Необходимо очистить кэш и куки вашего браузера. Нажмите комбинацию клавиш Ctrl+F5 (если у вас компьютер) или Ctrl+Shift+Delete (если у вас ноутбук). \n' +
        'Шаг 3. В вышедшем окне выберите временной диапазон ""Все время"" и проставьте галочки в сточках:\n' +
        '    - Файлы сохраненные в кеше\n' +
        '    - Файлы cookie и другие данные сайтов\n' +
        'Шаг 4. Нажмите на ""Удалить данные"" и обновите сайт олимпиады 1000bala.elumiti.kz, проверьте отображение теста в личном кабинете');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'NonStableInternet')
    ]));
});
bot.action('NonStableInternet', async (ctx) => {
    await ctx.reply('Есть большая вероятность того, что у вас нестабильное интернет соединение. Вам необходимо обеспечить хорошую скорость интернета для прохождения тестирования Скорость не менее 1 Мбит/сек на 1 рабочее место.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'TryToReLogin')
    ]));
});

// Показывает, что тест пройден, даже если не начинали тестирование
bot.hears('Показывает, что тест пройден, даже если не начинали тестирование', async (ctx) => {
    await ctx.reply('Для устанения проблемы строго следовать следующим шагам: \n' +
        '\n' +
        '1. Необходимо очистить кэш и куки вашего браузера. Нажмите комбинацию клавиш Ctrl+F5 (если у вас компьютер) или Ctrl+Shift+Delete (если у вас ноутбук). \n' +
        '2. В вышедшем окне выберите временной диапазон "Все время" и проставьте галочки в сточках:\n' +
        '    - Файлы сохраненные в кеше\n' +
        '    - Файлы cookie и другие данные сайтов\n' +
        '3. Нажмите на "Удалить данные" и обновите сайт олимпиады 1000bala.elumiti.kz, проверьте доступность теста в личном кабинете');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'CheckDateTime')
    ]));
});

//После верификации и предоставления доступа к демонстации экрана идет сброс и обновление
bot.hears('После верификации и предоставления доступа к демонстации экрана идет сброс и обновление', async (ctx) => {
    await ctx.reply('Для начала убедитесь, что вы вошли в личный кабинет на сайте 1000bala.elumiti.kz и что у вас компьютер или ноутбук на базе ОС Windows (предпочтительно) или Mac. \n' +
        'Соответствует техническим требованиям для системы тестирования:\n' +
        '• 4 Гб оперативной памяти;\n' +
        '• наличие веб-камеры (проверить подключение к системному блоку) - если компьютер\n' +
        '• наличие работоспособной камеры - если ноутбук\n' +
        '• наличие стабильного интернет-соединения не менее 1 Мбит/сек на 1 рабочее место;\n' +
        '• последние актуальные версии рекомендуемых браузеров Google Chrome, Mozilla Firefox, Opera, Yandex.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'SystemAllow')
    ]));
});
//На этапе верификации при попытке сделать фотографию участника выходит "Ошибка"
bot.hears('На этапе верификации при попытке сделать фотографию участника выходит "Ошибка"', async (ctx) => {
    await ctx.reply('Для начала убедитесь, что вы вошли в личный кабинет на сайте 1000bala.elumiti.kz и что у вас компьютер или ноутбук на базе ОС Windows (предпочтительно) или Mac. \n' +
        'Соответствует техническим требованиям для системы тестирования:\n' +
        '• 4 Гб оперативной памяти;\n' +
        '• наличие веб-камеры (проверить подключение к системному блоку) - если компьютер\n' +
        '• наличие работоспособной камеры - если ноутбук\n' +
        '• наличие стабильного интернет-соединения не менее 1 Мбит/сек на 1 рабочее место;\n' +
        '• последние актуальные версии рекомендуемых браузеров Google Chrome, Mozilla Firefox, Opera, Yandex.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'SystemAllow')
    ]));
});
bot.action('SystemAllow', async (ctx) => {
    await ctx.reply('Убедитесь, что вы предоствили все необходимые доступы системе прокторинга: \n' +
        '- ознакомились с правилами прокторинга\n' +
        '- предоставили доступ к демонстрации всего экрана ноутбука/компьютера, не к окну или к вкладке браузера\n' +
        '- разрешили доступ к использованию камеры\n' +
        '- сделали фотографию для идентификации');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'CacheClear')
    ]));
});
bot.action('CacheClear', async (ctx) => {
    await ctx.reply('Выполните слудующие шаги для устранения неполадки: \n' +
        '\n' +
        '1. Необходимо очистить кэш и куки вашего браузера. \n' +
        'Нажмите комбинацию клавиш Ctrl+F5 (если у вас компьютер) или Ctrl+Shift+Delete (если у вас ноутбук). \n' +
        '2. В вышедшем окне выберите временной диапазон ""Все время"" и проставьте галочки в сточках: - Файлы сохраненные в кеше - Файлы cookie и другие данные сайтов \n' +
        '3. Нажмите на ""Удалить данные"" и обновите сайт олимпиады 1000bala.elumiti.kz, проверьте доступность теста в личном кабинете');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'CheckDateTime1')
    ]));
});
bot.action('CheckDateTime1', async (ctx) => {
    await ctx.reply('Проверьте текущую/актуальную дату и время вашего компьютера или ноутбука. Совпадают ли они с актуальной датой и времем по Астане?', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'ReloadPC'),
        Markup.button.callback('Нет', 'DateTimeIsIncorrect'),
        Markup.button.callback('На главную', 'toHomePageRU')
    ]));
});
bot.action('ReloadPC', async (ctx) => {
    await ctx.reply('Попробуйте полностью перезагрузить свой ноутбук или компьютер, возможно проблема в драйверах устройства. После перезагрузки следуйте предыдущим шагам в инструкциях и повторите попытку.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'AnotherPC')
    ]));
});
bot.action('AnotherPC', async (ctx) => {
    await ctx.reply('Рекомендуем сдать тестирование с другого компьютера или ноутбука, возможно проблема в драйверах вашего устройства.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Помогли ли рекомендации? ', Markup.inlineKeyboard([
        Markup.button.callback('Да', 'RecHelpYes'),
        Markup.button.callback('Нет', 'WriteToTechHelp')
    ]));
});

// Техникалық ақаулар - тест тапсыра алмаймын
bot.hears('Техникалық ақаулар - тест тапсыра алмаймын', async (ctx) => {
    ctx.reply('Белгілі бір мәселені таңдаңыз', Markup.keyboard([
        ['Тесттер жоқ'],
        ['Прокторинг арқылы тексерісті өтіп және тестілеуге кірген соң тапсырмалар көрінбейді'],
        ['Тестілеу басталмаса да, "тест тапсырылған" деп көрсетеді'],
        ['Тексеруден кейін және экранның демонстрациясына кіруге рұқсат берілгеннен кейін бағдарлама параметрлері арылтып, экран жаңартылады'],
        ['Тексеру кезеңінде қатысушының фотосуретін түсіруге тырысқанда қателік шығады']
    ]).oneTime());
    try {
        const userId = ctx.from.id;

        let TechSupportInstanceKZ = await TechSupportModelKZ.findOne({});
        if (!TechSupportInstanceKZ) {
            // If no document is found, initialize with default values
            TechSupportInstanceKZ = new TechSupportModelKZ();
        }

        if (!TechSupportInstanceKZ.uniqueUsers.includes(userId)) {
            await TechSupportInstanceKZ.updateOne({
                $inc: { 'phrases.Техникалық ақаулар - тест тапсыра алмаймын': 1 },
                $addToSet: { uniqueUsers: userId }
            }, { upsert: true });
            console.log(`Count for "Техникалық ақаулар - тест тапсыра алмаймын" updated in the database for user ${userId}.`);

            // Your logic for handling the specific phrase here
        } else {
            console.log(`User ${userId} already sent "Техникалық ақаулар - тест тапсыра алмаймын".`);
        }
    } catch (error) {
        console.error('Error updating count for "Техникалық ақаулар - тест тапсыра алмаймын":', error);
    }
});
//Тесттер жоқ
bot.hears('Тесттер жоқ', async (ctx) => {
    await ctx.reply('Мәселені шешу үшін келесі қадамдарды қатаң орындаңыз\n' +
        'Браузердің кэш пен куки тазалауды ұсынамыз:\n' +
        '1. Ctrl+F5 (егер сізде компьютер болса) немесе Ctrl+Shift+Delete (егер сізде ноутбук болса) пернелер тіркесімін басыңыз.\n' +
        '2. Пайда болған терезеде "барлық уақытта" уақыт диапазонын таңдап, келесі жолдарға құсбелгісін қойыңыз:\n' +
        '- - Кэште сақталған файлдар\n' +
        '- Cookie файлдары және сайттың басқа деректері\n' +
        '3. "Деректерді жою" түймесін басып, олимпиада сайтын 1000bala.elumiti.kz жаңартыңыз. Жеке кабинетке кіріп, тесттің қолжетімділігін тексеріңіз');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'CheckDateTimeKZ')
    ]));
});
bot.action('RecHelpYesKZ', async (ctx) => {
    await ctx.reply('Олимпиядаға сәттілік!)', Markup.inlineKeyboard([
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});
bot.action('CheckDateTimeKZ', async (ctx) => {
    await ctx.reply('Компьютердің немесе ноутбуктің күні мен уақытының өзектілігін тексеріңіз. Ол Астана уақытымен сәйкес келе ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'TryToReLoginKZ'),
        Markup.button.callback('Жоқ', 'DateTimeIsIncorrectKZ'),
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});
bot.action('TryToReLoginKZ', async (ctx) => {
    await ctx.reply('Олимпиадағы қатысушының жеке кабинетінен 1000bala.elumiti.kz шығып, кабинетке қайта кіріңіз. ');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'WriteToTechHelpKZ')
    ]));
});
bot.action('WriteToTechHelpKZ', async (ctx) => {
    await ctx.reply('Сілтеме арқылы чатқа жазыңыз, біз сізге көмектесеміз. Жеке деректеріңізді беруге дайын болыңыз (ЖСН және тел. нөмір): \n' +
        'https://jivo.chat/UoLJfeceLg', Markup.inlineKeyboard([
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});
// Incorrect Date and Time
bot.action('DateTimeIsIncorrectKZ', async (ctx) => {
    await ctx.reply('Егер күн мен уақыт дұрыс көрсетілмесе, онда оларды компьютерде/ноутбукта өзгерту керек. Ол үшін:\n' +
        '1. Компьютерде ""Пуск>Параметры> Время и язык> Дата и Время"" бөліміне өтіңіз.\n' +
        '2. Уақыт белдеуін автоматты түрде орнатуды өшіріп, UTC +05:00 уақыт белдеуін қолмен көрсетіңіз (Қызылорда, Ашхабад, Ташкент, Карачи, Екатеринбург)\n' +
        '3. Қорытынды нәтижені тексеріңіз, уақыты мен күні Астана қаласы бойынша өзекті болуы тиіс. \n' +
        'Егер бәрі дұрыс көрсетілсе, олимпиада сайтын 1000bala.elumiti.kz жаңартыңыз. Жеке кабинетте тесттің қолжетімділігін тексеріңіз');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'TryToReLoginKZ')
    ]));
});

// Прокторинг арқылы тексерісті өтіп және тестілеуге кірген соң тапсырмалар көрінбейді
bot.hears('Прокторинг арқылы тексерісті өтіп және тестілеуге кірген соң тапсырмалар көрінбейді', async (ctx) => {
    await ctx.reply('Тапсырманыз жүктелуде.\n' +
        '1-қадам. Интернет байланысын тексеру керек, ол тұрақты болуы керек.\n' +
        '2-қадам. Браузердің кэш пен куки тазалауды ұсынамыз:\n' +
        'Ctrl+F5 (егер сізде компьютер болса) немесе Ctrl+Shift+Delete (егер сізде ноутбук болса) пернелер тіркесімін басыңыз.\n' +
        '3-қадам. Пайда болған терезеде "барлық уақытта" уақыт диапазонын таңдап, келесі жолдарға құсбелгісін қойыңыз:\n' +
        '- - Кэште сақталған файлдар\n' +
        '- Cookie файлдары және сайттың басқа деректері\n' +
        '4-қадам. "Деректерді жою" түймесін басып, олимпиада сайтын 1000bala.elumiti.kz жаңартыңыз. Жеке кабинетке кіріп, тесттің қолжетімділігін тексеріңіз');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'NonStableInternetKZ')
    ]));
});
bot.action('NonStableInternetKZ', async (ctx) => {
    await ctx.reply('Сізде тұрақсыз интернет байланысы болуы мүмкін. Тестілеуден өту үшін сізге жақсы интернет жылдамдығын қамтамасыз ету қажет. Жылдамдық 1 жұмыс орнына кемінде 1 Мбит/сек.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'TryToReLoginKZ')
    ]));
});

//Тестілеу басталмаса да, "тест тапсырылған" деп көрсетеді
bot.hears('Тестілеу басталмаса да, "тест тапсырылған" деп көрсетеді', async (ctx) => {
    await ctx.reply('Мәселені шешу үшін келесі қадамдарды қатаң орындаңыз\n' +
        'Браузердің кэш пен куки тазалауды ұсынамыз:\n' +
        '1. Ctrl+F5 (егер сізде компьютер болса) немесе Ctrl+Shift+Delete (егер сізде ноутбук болса) пернелер тіркесімін басыңыз.\n' +
        '2. Пайда болған терезеде "барлық уақытта" уақыт диапазонын таңдап, келесі жолдарға құсбелгісін қойыңыз:\n' +
        '- - Кэште сақталған файлдар\n' +
        '- Cookie файлдары және сайттың басқа деректері\n' +
        '3. "Деректерді жою" түймесін басып, олимпиада сайтын 1000bala.elumiti.kz жаңартыңыз. Жеке кабинетке кіріп, тесттің қолжетімділігін тексеріңіз');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'CheckDateTimeKZ')
    ]));
});
//Тексеруден кейін және экранның демонстрациясына кіруге рұқсат берілгеннен кейін бағдарлама параметрлері арылтып, экран жаңартылады
bot.hears('Тексеруден кейін және экранның демонстрациясына кіруге рұқсат берілгеннен кейін бағдарлама параметрлері арылтып, экран жаңартылады', async (ctx) => {
    await ctx.reply('Біріншіден, сіз 1000bala.elumiti.kz сайтында өз жеке кабинетке кіргеніне көз жеткізіңіз. Сізде Windows немесе Mac OS негізіндегі компьютер немесе ноутбук бар екеніне және тестілеу жүйесінің техникалық талаптарына сәйкес келетініне көз жеткізіңіз: \n' +
        '• 4 Гб жедел жады (RAM);\n' +
        '• жұмыс істейтін веб-камераның болуы (жүйелік блокқа қосылуды тексеріңіз)\n' +
        '• 1 жұмыс орнына кемінде 1 Мбит/сек тұрақты интернет байланысы бар болуы;\n' +
        '• ұсынылған браузерлердің соңғы жаңартылған нұсқалары - Google Chrome, Mozilla Firefox, Opera, Yandex.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'SystemAllowKZ')
    ]));
});
// Тексеру кезеңінде қатысушының фотосуретін түсіруге тырысқанда қателік шығады
bot.hears('Тексеру кезеңінде қатысушының фотосуретін түсіруге тырысқанда қателік шығады', async (ctx) => {
    await ctx.reply('Біріншіден, сіз 1000bala.elumiti.kz сайтында өз жеке кабинетке кіргеніне көз жеткізіңіз. Сізде Windows немесе Mac OS негізіндегі компьютер немесе ноутбук бар екеніне және тестілеу жүйесінің техникалық талаптарына сәйкес келетініне көз жеткізіңіз: \n' +
        '• 4 Гб жедел жады (RAM);\n' +
        '• жұмыс істейтін веб-камераның болуы (жүйелік блокқа қосылуды тексеріңіз)\n' +
        '• 1 жұмыс орнына кемінде 1 Мбит/сек тұрақты интернет байланысы бар болуы;\n' +
        '• ұсынылған браузерлердің соңғы жаңартылған нұсқалары - Google Chrome, Mozilla Firefox, Opera, Yandex.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'SystemAllowKZ')
    ]));
});
bot.action('SystemAllowKZ', async (ctx) => {
    await ctx.reply('Прокторинг жүйесіне барлық қажетті рұқсаттарды бергеніңізге көз жеткізіңіз:\n' +
        '- прокторинг ережелерімен таныстыңыз\n' +
        '- ноутбуктің/компьютердің бүкіл экранының демонстрациясына қол жеткіздіңіз, (тек браузер терезесіне немесе браузер қосымшасына ғана емес)\n' +
        '- камераны пайдалануға рұқсат бердіңіз\n' +
        '- идентификация ережесіне сай суретке түсірдіңіз');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'CacheClearKZ')
    ]));
});
bot.action('CacheClearKZ', async (ctx) => {
    await ctx.reply('Мәселені шешу үшін келесі қадамдарды қатаң орындаңыз\n' +
        'Браузердің кэш пен куки тазалауды ұсынамыз:\n' +
        '1. Ctrl+F5 (егер сізде компьютер болса) немесе Ctrl+Shift+Delete (егер сізде ноутбук болса) пернелер тіркесімін басыңыз.\n' +
        '2. Пайда болған терезеде "барлық уақытта" уақыт диапазонын таңдап, келесі жолдарға құсбелгісін қойыңыз:\n' +
        '- - Кэште сақталған файлдар\n' +
        '- Cookie файлдары және сайттың басқа деректері\n' +
        '3. "Деректерді жою" түймесін басып, олимпиада сайтын 1000bala.elumiti.kz жаңартыңыз. Жеке кабинетке кіріп, тесттің қолжетімділігін тексеріңіз');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'CheckDateTime1KZ')
    ]));
});
bot.action('CheckDateTime1KZ', async (ctx) => {
    await ctx.reply('Компьютердің немесе ноутбуктің күні мен уақытының өзектілігін тексеріңіз. Ол Астана уақытымен сәйкес келе ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'ReloadPCKZ'),
        Markup.button.callback('Жоқ', 'DateTimeIsIncorrect'),
        Markup.button.callback('Басты бетке', 'toHomePageKZ')
    ]));
});
bot.action('ReloadPCKZ', async (ctx) => {
    await ctx.reply('Ноутбукты немесе компьютерді толығымен қайта қосып көріңіз, мәселе құрылғы драйверлерінде болуы мүмкін. Қайта жүктегеннен кейін нұсқаулықтағы алдыңғы қадамдарды орындап, әрекетті қайталаңыз.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'AnotherPCKZ')
    ]));
});
bot.action('AnotherPCKZ', async (ctx) => {
    await ctx.reply('Басқа компьютерден немесе ноутбуктен тестілеуді өтуге ұсынамыз, мүмкін мәселе құрылғының драйверлерінде болуы мүмкін.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    await ctx.reply('Ұсыныстар көмектесті ме?', Markup.inlineKeyboard([
        Markup.button.callback('Ия', 'RecHelpYesKZ'),
        Markup.button.callback('Жоқ', 'WriteToTechHelpKZ')
    ]));
});
bot.launch();