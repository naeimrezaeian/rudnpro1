const Database=require('./Db');
const Model=require('./Models');
const moment=require('moment')
const bcrypt = require('bcryptjs');

const fs = require('fs');

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("1234", salt);

const  user_list=[];


// Name,Birthday,Sex ,Email ,Phone ,Address ,Country ,City ,FeldId,TypeStudy ,FormStudy ,YearStudy ,Additional ,Photo ,Access,Status

 user_list.push(new Model.User("962c20a8-682c-4c46-b1a5-4e26556f223f","Наим Резаиан",moment("2000-04-21","YYYY/MM/DD").toDate(),0,"rezaian-n@rudn.ru","+79252706166","Проспект мира дом 70","Россия","Москва",1,0,0,"2019-2020","desc1","file","admin",1,hash));
 user_list.push(new Model.User("8dee61e1-73f2-a-9e8e-e682f8529baa","Ситников Клемент Авксентьевич",moment("2000-04-21","YYYY/MM/DD").toDate(),0,"admin@rudn.ru","+79211679562","ул. Славы, 37","Россия","Дмитров",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("fe7fbe6b-1701-47e7-b23d-a4a9fefbf225","Некрасов Мартин Ростиславович",moment("2000-04-22","YYYY/MM/DD").toDate(),0,"user3@rudn.ru","+79211679163","бульвар Славы, 80","Россия","Щёлково",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("5372fcef-168c-435f-bdb4-7d06333930d9","Шарапов Ким Мартынович",moment("2002-05-17","YYYY/MM/DD").toDate(),0,"user4@rudn.ru","+79223689512","пл. Сталина, 44","Россия","Москва",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("e39ee458-0ac9-48b3-9f13-b1d3702524cc","Потапов Лука Пантелеймонович",moment("1999-1-05","YYYY/MM/DD").toDate(),0,"user5@rudn.ru","+79273119212","пр. Ломоносова, 39","Россия","Видное",2,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("d49af1de-04df-4839-814b-96c0494e5277","Кабанов Иван Аркадьевич",moment("2001-06-06","YYYY/MM/DD").toDate(),0,"user6@rudn.ru","+79274118218","ул. Бухарестская, 46","Россия","Дорохово",2,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("3518492b-d529-489e-8fd3-17b0ef0108ae","Тетерин Лавр Мэлсович",moment("2000-03-12","YYYY/MM/DD").toDate(),0,"user7@rudn.ru","+79273119212","пр. Славы, 81","Одинцово","Россия",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("3e1ad7ca-38c1-4440-92c9-6d3841135c0f","Зимин Болеслав Кириллович",moment("2001-08-12","YYYY/MM/DD").toDate(),0,"user8@rudn.ru","+79573118277","спуск Сталина, 56","Россия","Шаховская",3,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("faf92dbf-e7c3-4dc0-9f6c-d2847343dd1c","Беляев Митрофан Ефимович",moment("1999-02-07","YYYY/MM/DD").toDate(),0,"user9@rudn.ru","+79118969513","шоссе Славы, 28","Россия","Москва",2,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("b7bf08b7-87a5-4dfd-b240-1ad9710f3dfd","Ермаков Вениамин Лукьевич",moment("2002-11-13","YYYY/MM/DD").toDate(),0,"user10@rudn.ru","+79224115217","ул. Домодедовская, 07","Россия","Балашиха",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("0a1d1bda-c674-4a2b-b6d6-82022c3779b8","Субботин Владлен Семёнович",moment("2000-01-14","YYYY/MM/DD").toDate(),0,"user11@rudn.ru","+79275119511","Бухарестская, 46","Россия","Москва",2,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("1c6c3221-c63c-466e-a6f6-266cef7b6785","Туров Марк Владимирович",moment("2000-09-02","YYYY/MM/DD").toDate(),0,"user12@rudn.ru","+79177079112","шоссе Ладыгина, 12","Россия","Истра",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("1d4340db-6df8-4b37-93f7-ab3f6d1b18b1","Трофимов Назарий Наумович",moment("2000-11-02","YYYY/MM/DD").toDate(),0,"user13@rudn.ru","+79273783219","проезд Ладыгина, 85","Россия","Красногорск",2,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("0ec6aab1-1781-467a-b9c6-7a4bb3fae29b","Щукин Яков Авдеевич",moment("2000-05-03","YYYY/MM/DD").toDate(),0,"user14@rudn.ru","+79273119212","пл. 1905 года, 25","Россия","Волоколамск",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("50a95fc4-1c49-4bc5-b16b-d6353c0eed02","Дроздов Адольф Оскарович",moment("2000-05-04","YYYY/MM/DD").toDate(),0,"user15@rudn.ru","+79274557781","спуск Домодедовская, 25","Россия","Ногинск",2,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("d449a796-abec-4758-b255-fbd3a5eb2b5b","Одинцов Аверьян Матвеевич",moment("2002-04-19","YYYY/MM/DD").toDate(),0,"user16@rudn.ru","+79273119212","пер. Чехова, 65","Россия","Серебряные Пруды",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("6ff8de02-71ef-4481-bda0-3e9caa3f9c2f","Воронов Тихон Протасьевич",moment("2001-11-18","YYYY/MM/DD").toDate(),0,"user17@rudn.ru","+79227788310","ул. Гагарина, 02","Россия","Москва",2,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("146822f4-beb2-4f9c-b9e6-3c3151ded7aa","Калинин Прохор Павлович",moment("1999-11-12","YYYY/MM/DD").toDate(),0,"user18@rudn.ru","+79227788311","спуск Будапештсткая, 86","Россия","Москва",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("a567f8e9-725c-41e1-9007-027207678db7","Дроздов Азарий Авдеевич",moment("2001-04-02","YYYY/MM/DD").toDate(),0,"user19@rudn.ru","+79228338310","пр. Космонавтов, 49","Россия","Москва",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("efbe3cc4-50f8-4a72-b6e4-fafb7a5f0259","Никонов Корнелий Николаевич",moment("2001-07-03","YYYY/MM/DD").toDate(),0,"user20@rudn.ru","+7981788315","наб. Гагарина, 60","Россия","Павловский Посад",2,0,0,"2019-2020","desc1","file","student",1,hash));
 

 user_list.push(new Model.User("f75dd1d5-6a75-49b8-8708-237f403b5ed7","Абрамова Дебора Митрофановна",moment("2001-11-01","YYYY/MM/DD").toDate(),1,"user21@rudn.ru","+79211679562","пр. Балканская, 12","Россия","Москва",2,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("2ed944e7-374b-4075-a4bd-ccb85f171e4a","Юдина Серафима Валерьяновна",moment("2000-03-22","YYYY/MM/DD").toDate(),1,"user22@rudn.ru","+79211629674","пр. Балканская, 13","Россия","Москва",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("df829684-fe71-464c-b382-5d6c9ae3900c","Фёдорова Кристина Петровна",moment("2001-02-12","YYYY/MM/DD").toDate(),1,"user23@rudn.ru","+79221629675","пр. Балканская, 14","Россия","Москва",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("b316858c-28ef-4dc8-ad0a-876f009249a9","Данилова Розалина Германновна",moment("2000-08-12","YYYY/MM/DD").toDate(),1,"user24@rudn.ru","+79218629676","спуск Косиора, 90","Россия","Можайск",2,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("1792ea28-7529-44a0-a563-6a1c16cd9059","Королёва Северина Германновна",moment("2001-08-07","YYYY/MM/DD").toDate(),1,"user25@rudn.ru","+79251629671","ул. Ладыгина, 44","Россия","Дорохово",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("254186da-1857-43da-893b-8a003d0d2fb5","Лапина Элеонора Геласьевна",moment("2001-11-03","YYYY/MM/DD").toDate(),1,"user26@rudn.ru","+79222679563","бульвар Косиора, 81","Россия","Москва",2,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("cc23c6af-c6f0-4e7a-b6e6-2a58d43cbb83","Игнатова Серафима Натановна",moment("2000-09-04","YYYY/MM/DD").toDate(),1,"user27@rudn.ru","+79522679563","проезд Ленина, 27","Россия","Озёры",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("157bf93e-c62e-4ab1-b99b-8cfbe8442763","Сергеева Варвара Викторовна",moment("2001-12-02","YYYY/MM/DD").toDate(),1,"user28@rudn.ru","+79231679568","шоссе Славы, 91","Россия","Солнечногорск",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("33fbf79f-c3f3-4239-9ce5-307e32e18b1e","Сафонова Романа Станиславовна",moment("2001-05-02","YYYY/MM/DD").toDate(),1,"user29@rudn.ru","+79243679561","Космонавтов, 67","Россия","Москва",2,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("a6462eea-b8d1-473b-818b-818b0c7d9764","Никифорова Карина Васильевна",moment("2000-09-23","YYYY/MM/DD").toDate(),1,"user30@rudn.ru","+792743677571","шоссе Гагарина, 17","Россия","Москва",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("2f40af54-e320-4e27-a267-6e70a6960667","Кондратьева Риана Николаевна",moment("2001-02-14","YYYY/MM/DD").toDate(),1,"user31@rudn.ru","+79253119221","пр. Косиора, 26","Россия","Сергиев Посад",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("61405e07-a56d-4bbd-abde-a3662d079273","Лебедева Сусанна Геннадьевна",moment("2000-03-12","YYYY/MM/DD").toDate(),1,"user32@rudn.ru","+79213619161","въезд Славы, 156","Россия","Москва",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("1595f1f8-29cc-4858-8488-8093fe1f9fd0","Носова Милена Германновна",moment("2001-04-27","YYYY/MM/DD").toDate(),1,"user33@rudn.ru","+79253666561","пр. Космонавтов, 71","Россия","Солнечногорск",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("50088ff6-be61-42ca-be02-7790e5d53d73","Тимофеева Лина Руслановна",moment("2001-02-28","YYYY/MM/DD").toDate(),1,"user34@rudn.ru","+79243679567","проезд Бухарестская, 16","Россия","Сергиев Посад",2,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("c0a7934d-bfbc-40ff-bb2f-4fdec014ad8c","Николаева Элла Анатольевна",moment("2002-07-28","YYYY/MM/DD").toDate(),1,"user35@rudn.ru","+79763679577","наб. Ленина, 36","Россия","Москва",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("ec674ab6-13cc-4519-b76f-792e3cea374a","Третьякова Фелиция Наумовна",moment("2002-8-02","YYYY/MM/DD").toDate(),1,"user36@rudn.ru","+79211679665","ул. Маяковского, дом 18","Россия","Москва",2,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("45cbfcf8-8efd-421c-80f6-082aefd05a73","Елисеева Валерия Евсеевна",moment("2001-11-11","YYYY/MM/DD").toDate(),1,"user37@rudn.ru","+79222679664","ул. Пушкина, дом 3","Россия","Москва",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("24f84793-5e7f-48df-8352-dcc8f5d15804","Миронова Рая Антониновна",moment("2001-02-01","YYYY/MM/DD").toDate(),1,"user38@rudn.ru","+792886796633","ул. Сталина, дом 60","Россия","г.Воротынец",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("6d8afd67-c736-433b-8b94-75ac946c11fd","Логинова Ирина Святославовна",moment("2001-08-07","YYYY/MM/DD").toDate(),1,"user39@rudn.ru","+79201679615","ул. Садовая, дом 33","Россия","г.Борисоглебск",1,0,0,"2019-2020","desc1","file","student",1,hash));
 user_list.push(new Model.User("93030715-f71b-479e-958a-3019156c030c","Гущина Дионисия Дмитрьевна",moment("2002-06-13","YYYY/MM/DD").toDate(),1,"user40@rudn.ru","+79212679110","ул. Хрущёва, дом 64","Россия","г.Дрожжаное",1,0,0,"2019-2020","desc1","file","student",1,hash));
 
 user_list.push(new Model.User("83b71e05-f414-4c83-9774-7d0aeb44fedd","Селезнёв Панкратий Витальевич",moment("1986-06-13","YYYY/MM/DD").toDate(),1,"user41@rudn.ru","+79212679111","ул. Хрущёва, дом 65","Россия","Москва",1,0,0,"2019-2020","desc1","file","teacher",1,hash));
 user_list.push(new Model.User("108e5270-91ee-471b-adfc-b874992794b1","Потапов Пантелей Тимурович",moment("1981-11-02","YYYY/MM/DD").toDate(),1,"user42@rudn.ru","+79212679112","ул. Хрущёва, дом 66","Россия","Москва",1,0,0,"2019-2020","desc1","file","teacher",1,hash));
 user_list.push(new Model.User("6ebd5269-1f59-4cfe-bdef-53c90e8cf1d7","Ширяев Юстин Игнатьевич",moment("1981-12-12","YYYY/MM/DD").toDate(),1,"user43@rudn.ru","+79212679113","ул. Хрущёва, дом 67","Россия","Москва",1,0,0,"2019-2020","desc1","file","teacher",1,hash));
 user_list.push(new Model.User("2acdb9a0-2354-43fa-9bc5-a05669d9f000","Меркушев Аскольд Игоревич",moment("1982-09-07","YYYY/MM/DD").toDate(),1,"user44@rudn.ru","+79212679114","ул. Хрущёва, дом 68","Россия","Москва",1,0,0,"2019-2020","desc1","file","teacher",1,hash));
 

// Faculty
//Title,Address,Phone,Email,Description,Photo,Status
var faculty=[];

faculty.push( new Model.Faculty("Цифровой подготовительный факультет","миклухо маклая дом 6","+7 (495) 787-38-03 доп.: 2475","langrus@rudn.ru","Цифровой подготовительный факультет – это международная модель обучения иностранных граждан по программам подготовительных факультетов российских вузов, реализуемая полностью с использованием современных дистанционных технологий.","faculty1.jpg",1));
faculty.push( new Model.Faculty("Факультет гуманитарных и социальных наук","миклухо маклая дом 10","+7 (495) 787-38-03 доп.: 1295, 1338","tsvyk-va@rudn.ru","Целями учебной дисциплины «Энергетическая политика в современном мире» являются получение студентами теоретических знаний об энергетических политиках государств и политико-экономических надгосударственных образований, факторах, создающих их в современном мире, динамике развития и практических навыков по формированию и реализации энергетической политики государства.","faculty2.jpg",1));
faculty.push( new Model.Faculty("Факультет физико-математических и естественных наук","ул. Орджоникидзе, 3, Москва","+7 (495) 952-26-44","voskresenskiy-lg@rudn.ru","Подготовительные курсы. Форма обучения: заочная, очная. Уровень подготовки: магистратура, бакалавриат, аспирантура, докторантура. Направления подготовки: информатика, менеджмент, математика, химия","faculty3.jpg",1));
faculty.push( new Model.Faculty("Экологический факультет","миклухо маклая дом 11","+7 (495) 952-89-01","ecology@rudn.ru","Экологический факультет Российского университета дружбы народов создан в 1992 году по инициативе Ректора УДН им. П. Лумумбы Владимира Францевича Станиса. Экологический факультет был первым системным факультетом в России в этой области знаний. Основной идеей при его создании было стремление дать широкое и глубокое образование не только в области экологии, но и всему спектру дисциплин, которые необходимы экологу в его научной и практической деятельности, которое возможно в рамках классического университета.","faculty4.jpg",1));
faculty.push( new Model.Faculty("Экономический факультет","миклухо маклая дом 6","+7 (495) 434-43-15","moseykin-yun@rudn.ru","Получить высшее экономическое образование в Москве приглашает Вас один из старейших факультетов Российского университета дружбы народов. Университет федерального уровня учрежден постановлением Совета Министров СССР в 1960 году, а в 1992-ом переименован в Российский университет дружбы народов.","faculty5.jpg",1));
faculty.push( new Model.Faculty("Факультет русского языка и общеобразовательных дисциплин","миклухо маклая дом 8","+7 (495) 787-38-03 доп.: 1500","pomortseva-nv@rudn.ru","Кафедра Русского языка № 1 проводит обучение иностранных студентов естественно-научных и инженерных специальностей, а также по специальностям аграрно-технологического института по дисциплинам: «Русский язык» (А1, А2, В1), «Фонетический практикум» и «Научный стиль речи». Программа обучения направлена на формирование навыков и умений, позволяющих иностранным студентам не только успешно решать коммуникативные задачи в повседневной жизни, но и осваивать учебный материал на всех последующих этапах обучения в Университете. Особое внимание уделяется изучению языка будущей специальности.","faculty6.jpg",1));
faculty.push( new Model.Faculty("Филологический факультет","миклухо маклая дом 11","+7 (495) 434-37-45","barabash-vv@rudn.ru","Студенты бакалавриата, магистратуры и аспирантуры Российского университета дружбы народов могут подать заявку на прохождение пятимесячной стажировки в Брюссельском свободном университете (Бельгия) в течение первого семестра 2021/22 учебного года.","faculty7.jpg",1));
faculty.push( new Model.Faculty("Инженерная академия","ул. Орджоникидзе, 3, Москва","+7 (495) 952-08-29","razoumny-yun@rudn.ru","Постановление ЦК КПСС и Совета Министров СССР «Об организации Университета дружбы народов», датированное 5 февраля 1960 года, извещало о том, что «Университет дружбы народов готовит инженеров, специалистов сельского хозяйства, учителей, врачей, экономистов и специалистов по другим отраслям знаний».","faculty8.jpg",1));
faculty.push( new Model.Faculty("Юридический институт","миклухо маклая дом 6","+7 (495) 434-32-22","law@rudn.ru","Юридический институт РУДН основан в 1960 году как факультет экономики и права. В 1995 году произошло разделение факультета на два новых: экономический и юридический. В 2014 году юридический факультет преобразован в Юридический институт РУДН","faculty9.jpg",1));
faculty.push( new Model.Faculty("Аграрно-технологический институт","миклухо маклая дом 12","7 (495) 434-70-07","ovletyarova-ea@rudn.ru","Широкая профессиональная подготовка, знание иностранных языков обеспечивают трудоустройство и позволяют выпускникам института работать в российских и зарубежных университетах, на совместных предприятиях и в представительствах зарубежных фирм, в специализированных внешнеэкономических организациях, вести фермерское хозяйство и т.д.","faculty10.jpg",1));

//Department
//FacultyId,Title,Description,Status
var department =[]
department.push( new Model.Department(1,"Изучение отдельных модулей","По итогам успешного освоения модуля/модулей слушатель получит документ об обучении по выбранному модулю/модулям.",1));
department.push( new Model.Department(1,"Базовый курс подготовки","По итогам освоения базового курса слушатель получит сертификат, подтверждающий знание русского языка и общеобразовательных дисциплин на уровне, необходимом для поступления в российские университеты",1));
department.push( new Model.Department(2,"Искусство и гуманитарные науки","Современный выпускник направления — это специалист с междисциплинарной ориентацией, работающий в традиционных сферах (музей и выставочный зал, театр, концертный зал, издательство) и в областях, связанных с менеджментом в сфере культуры (рекламное агентство, аукцион, кураторская деятельность в сфере культуры).",1));
department.push( new Model.Department(2,"Государственное и муниципальное управление","ыпускники бакалавриата обладают знаниями и умениями в области социального и государственного управления, современной экономики, административно-правовых методов управления, связей с общественностью.",1));
department.push( new Model.Department(2,"Политология","Политологи — это эксперты, которые обоснованно трактуют события в государстве. В магистратуре студенты приобретают опыт сотрудничества с различными политическими силами",1));
department.push( new Model.Department(2,"Социология","Социологи — это ученые, умеющие анализировать структуры социальных отношений в современном мире и осуществлять консультационную деятельность в сферах государственной власти и управления, бизнеса, культуры, СМИ, службах изучения общественного мнения.",1));
department.push( new Model.Department(2,"Зарубежное регионоведение","Выпускники бакалавриата обладают фундаментальным знанием иностранных языков, истории, географии, внутренней и внешней политики, демографии, культуры, права и экономики отдельного региона. Они способны обеспечивать дипломатические, внешнеэкономические, культурные контактов различных стран и регионов.",1));
department.push( new Model.Department(3,"Химия","Студенты-химики познают тонкости использования химических процессов и явлений в различных сферах деятельности. Выбирая одну из специализаций: органическая, физическая или неорганическая химия, — они определяют направление своей дальнейшей учебной и научно-исследовательской деятельности. Молодые ученые проводят эксперименты и занимаются научным творчеством в современных лабораториях и научных центрах.",1));
department.push( new Model.Department(3,"Физика","Студенты-физики — люди, по-настоящему увлеченные фундаментальной наукой о мироздании. Получая базовые знания общей и теоретической физики, они используют их для решения профессиональных задач в области физики плазмы, радиофизики, оптоэлектроники, физики элементарных частиц, теории гравитации и астрофизики. Физики реализуют свой научный потенциал в научно-исследовательской работе, экспериментальной деятельности, проявляют себя в научных семинарах и научно-практических конференциях.",1));
department.push( new Model.Department(3,"Бизнес-информатика","Выпускники направления «бизнес-информатика» — специалисты IT с набором знаний и навыков по управлению информационными ресурсами, моделированию бизнес-процессов, разработке технологий хранения, обработки и передачи информации.",1));
department.push( new Model.Department(3,"Фундаментальная информатика и информационные технологии","Выпускники направления — IT-специалисты, владеющие инструментами инфокоммуникационных технологий для науки, образования, производства, бизнеса и повседневной жизни.",1));
department.push( new Model.Department(3,"Математика и компьютерные науки","Будущие специалисты в области компьютерных наук учатся находить смелые решения для развития отраслей высоких технологий.",1));
department.push( new Model.Department(3,"Математика","Студенты-математики осваивают не только базовые математические дисциплины. Они получают навыки решения дифференциальных и функционально-дифференциальных уравнений и задач математической физики. Студенты разрабатывают эффективные методы оптимизации, ищут и находят ответы в области приложений к математической экономике, вычислительной гидродинамике, теории управления.",1));
department.push( new Model.Department(4,"Энерго- и ресурсосберегающие процессы в химической технологии, нефтехимии и биотехнологии","Специализации данного направления: «Ресурсосберегающие технологии и охрана окружающей среды», «Альтернативная энергетика», «Экологические проблемы утилизации и переработки отходов», «Менеджмент природопользования».",1));
department.push( new Model.Department(4,"Экология и природопользование","Обучающимся предлагаются специализации: «Геоэкология», «Экология человека», «Судебная экология», «Экспертная деятельность в экологии», «Экологический менеджмент», «Экология различных природно-климатических зон».",1));
department.push( new Model.Department(5,"Управление персоналом","Направление «Управление персоналом» реализуется в магистратуре экономического факультета. Специализация — «Управление персоналом в кросс-культурной среде».",1));
department.push( new Model.Department(5,"Финансы и кредит","Направление «Финансы и кредит» реализуется в магистратуре экономического факультета. Специализация — «Современные финансовые технологии в инвестировании и банковском бизнесе».",1));
department.push( new Model.Department(5,"Экономика","Направления «Экономика» реализуется в бакалавриате и магистратуре экономического факультета. Факультет предлагает программы на русском, английском и испанском языках, а также программы, реализуемые совместно с зарубежными вузами.",1));


//Field
//DepartmentId,Title,CourseCode,Description,Status
var field = [];
field.push(new Model.Field(1,"Четыре базовых модуля по русскому языку","1111","Описание 1",1));
field.push(new Model.Field(2,"Восемь модулей по общеобразовательным дисциплинам","2222","Описание 2",1));
field.push(new Model.Field(3,"Искусство и гуманитарные науки","3333","Описание 3",1));
field.push(new Model.Field(3,"Креативные индустрии и менеджмент в сфере культуры","4444","Описание 4",1));
field.push( new Model.Field(3,"Культурное наследие: исследование и управление","5555","Описание 5",1));
field.push( new Model.Field(11,"Управление инфокоммуникациями и интеллектуальные системы","6666","Описание 6",1));
field.push( new Model.Field(11,"ундаментальная информатика и информационные технологии","7777","Описание 7",1));
field.push( new Model.Field(12,"Математика и компьютерные науки","8888","Описание 8",1));
field.push( new Model.Field(14,"Тест Тест Тест ","9999","Описание 9",1));
field.push( new Model.Field(15,"Тест Тест Тест","9191","Описание 10",1));



//Subject 
//Title,Description,FieldId,Image,Status
var subject = [];
subject.push(new Model.Subject("Русский язык (А1, элементарный уровень)","Описание 1",1,"subpic1.jpg",1));
subject.push(new Model.Subject("Русский язык (B1, первый сертификационный уровень)","Описание 2",1,"subpic2.jpg",1));
subject.push(new Model.Subject("Технология программирования","Описание 3",7,"subpic3.jpg",1));
subject.push(new Model.Subject("Дискретная математика","Описание 4",7,"subpic4.jpg",1));
subject.push(new Model.Subject("Дифференциальные уравнения","Описание 5",8,"subpic5.jpg",1));

//Model
//Title,SubjectId,UrlModel,Parameters,Description,GeneralModel,Status
var model = [];
model.push(new Model.Model("ИИ модель 1",1,"http://37.18.79.144/ai/api/","1","Описание 1",0,1));
model.push(new Model.Model("ИИ модель 2",3,"http://37.18.79.144/ai/api/","2","Описание 2",1,1));
model.push(new Model.Model("ИИ модель 3",4,"http://37.18.79.144/ai/api/","3","Описание 3",0,1));
model.push(new Model.Model("ИИ модель 4",5,"http://37.18.79.144/ai/api/","4","Описание 4",1,1));

//Faq
//GroupId,Question,Answer,Status
var faq =[];
faq.push(new Model.Faq(1,"Вопрос 1","Ответ 1",1));
faq.push(new Model.Faq(1,"Вопрос 2","Ответ 2",1));
faq.push(new Model.Faq(1,"Вопрос 3","Ответ 3",1));
faq.push( new Model.Faq(2,"Вопрос 4","Ответ 4",1));
faq.push( new Model.Faq(2,"Вопрос 5","Ответ 5",1));
faq.push( new Model.Faq(2,"Вопрос 6","Ответ 6",1));
faq.push( new Model.Faq(3,"Вопрос 7","Ответ 7",1));
faq.push( new Model.Faq(3,"Вопрос 8","Ответ 8",1));
faq.push( new Model.Faq(3,"Вопрос 9","Ответ 9",1));
faq.push( new Model.Faq(3,"Вопрос 10","Ответ 10",1));

//Group
//Title,YearStudy,FieldAdd,TypeStudy,Description,,Status
var group = [];

group.push( new Model.Group("НИБ-201","2019-2020",1,1,"Описание 1",1));
group.push( new Model.Group("НИБ-202","2019-2020",1,1,"Описание 2",1));
group.push( new Model.Group("НИБ-203","2019-2020",1,1,"Описание 3",1));
group.push( new Model.Group("НИБ-204","2020-2021",0,1,"Описание 4",1));
group.push( new Model.Group("НИБ-205","2020-2021",0,1,"Описание 5",1));
group.push( new Model.Group("НИБ-206","2020-2021",1,1,"Описание 6",1));
group.push( new Model.Group("НИБ-207","2020-2021",1,1,"Описание 7",1));
group.push( new Model.Group("НИБ-208","2019-2020",15,1,"Описание 8",1));
group.push( new Model.Group("НИБ-209","2019-2020",1,1,"Описание 9",1));
group.push( new Model.Group("НИБ-2010","2019-2020",1,1,"Описание 10",1));

//GroupStudents
//GroupId,StudentId,Status
var groupstudent = [];
groupstudent.push( new Model.GroupStudent(1,'0a1d1bda-c674-4a2b-b6d6-82022c3779b8',1));
groupstudent.push( new Model.GroupStudent(1,'146822f4-beb2-4f9c-b9e6-3c3151ded7aa',1));
groupstudent.push( new Model.GroupStudent(1,'3518492b-d529-489e-8fd3-17b0ef0108ae',1));
groupstudent.push( new Model.GroupStudent(1,'6d8afd67-c736-433b-8b94-75ac946c11fd',1));

groupstudent.push( new Model.GroupStudent(2,'0ec6aab1-1781-467a-b9c6-7a4bb3fae29b',1));
groupstudent.push( new Model.GroupStudent(2,'24f84793-5e7f-48df-8352-dcc8f5d15804',1));
groupstudent.push( new Model.GroupStudent(2,'2f40af54-e320-4e27-a267-6e70a6960667',1));
groupstudent.push( new Model.GroupStudent(2,'a6462eea-b8d1-473b-818b-818b0c7d9764',1));

groupstudent.push( new Model.GroupStudent(3,'2ed944e7-374b-4075-a4bd-ccb85f171e4a',1));
groupstudent.push( new Model.GroupStudent(3,'50a95fc4-1c49-4bc5-b16b-d6353c0eed02',1));
groupstudent.push( new Model.GroupStudent(3,'6ff8de02-71ef-4481-bda0-3e9caa3f9c2f',1));
groupstudent.push( new Model.GroupStudent(3,'d449a796-abec-4758-b255-fbd3a5eb2b5b',1));
groupstudent.push( new Model.GroupStudent(3,'ec674ab6-13cc-4519-b76f-792e3cea374a',1));

//GroupRelation
//GroupId,TeacherId,SubjectId,Status
var grouprelation = [];
grouprelation.push(new Model.GroupRelation(1,'d449a796-abec-4758-b255-fbd3a5eb2b5b',1,1));
grouprelation.push(new Model.GroupRelation(3,'ec674ab6-13cc-4519-b76f-792e3cea374a',2,1));



//Question
//UserId,SubjectId,QuestionContent,QuestionType,QuestionScore,Model,Status
var question = [];
question.push(new Model.Question("108e5270-91ee-471b-adfc-b874992794b1",2,"Q1",1,10,1,1));
question.push(new Model.Question("108e5270-91ee-471b-adfc-b874992794b1",2,"Q2",2,10,1,1));
question.push(new Model.Question("108e5270-91ee-471b-adfc-b874992794b1",2,"Q3",1,10,1,1));
question.push(new Model.Question("962c20a8-682c-4c46-b1a5-4e26556f223f",3,"Q4",1,10,1,1));
question.push(new Model.Question("962c20a8-682c-4c46-b1a5-4e26556f223f",3,"Q5",3,10,1,1));
question.push(new Model.Question("962c20a8-682c-4c46-b1a5-4e26556f223f",3,"Q6",1,10,1,1));

//QuestionAnswer
//QuestionId,AnswerContent,AnswerCorrect
var questionanswer = [];
questionanswer.push(new Model.QuestionAnswer(1,"A1",true));
questionanswer.push(new Model.QuestionAnswer(2,"C1",false));
questionanswer.push(new Model.QuestionAnswer(2,"C2",true));
questionanswer.push(new Model.QuestionAnswer(2,"C3",false));
questionanswer.push(new Model.QuestionAnswer(2,"C4",false));
questionanswer.push(new Model.QuestionAnswer(3,"A3",true));
questionanswer.push(new Model.QuestionAnswer(4,"A4",true));
questionanswer.push(new Model.QuestionAnswer(5,"S1",false));
questionanswer.push(new Model.QuestionAnswer(5,"S2",true));
questionanswer.push(new Model.QuestionAnswer(5,"S3",true));
questionanswer.push(new Model.QuestionAnswer(6,"A6",true));
//Variant
//Title,GroupRelationId,Status
var variant= [];
variant.push(new Model.Variant("Группа вопросов  «Вариант 1»",1,1));
variant.push(new Model.Variant("Группа вопросов  «Вариант 2»",1,1));
variant.push(new Model.Variant("Группа вопросов  «Вариант 3»",1,1));
variant.push(new Model.Variant("Группа вопросов  «Вариант 4»",1,1));
variant.push(new Model.Variant("Группа вопросов  «Вариант 1»",2,1));
variant.push(new Model.Variant("Группа вопросов  «Вариант 2»",2,1));

//VariantQuestion
//QuestionId,VariantId,Status
var variantquestion = [];
variantquestion.push(new Model.VariantQuestion(1,1,1));
variantquestion.push(new Model.VariantQuestion(4,1,1));
variantquestion.push(new Model.VariantQuestion(3,2,1));
variantquestion.push(new Model.VariantQuestion(5,5,1));
variantquestion.push(new Model.VariantQuestion(6,5,1));

//Exam
//Title,FacultyId,DepartmentId,FieldId,SubjectId,TeacherId,
//ExamDateTime,ExamDuration,ExamLimit,DescriptionShort,Description,ExamImage,
//ExamSetting,Status
var exam=[];

exam.push(new Model.Exam("Экономика и юриспруденция.",1,1,moment("09/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate()
,30,1,"Описание короткое","Описание 1","exam1.jpg","1,1,1,1,1,1,1",1))
exam.push(new Model.Exam("Экономика и юриспруденция.",1,1,moment("10/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate()
,30,1,"Описание короткое","Описание 2","exam1.jpg","1,0,1,1,1,0,1",1))
exam.push(new Model.Exam("Экономика и юриспруденция.",1,1,moment("10/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate()
,30,1,"Описание короткое","Описание","exam1.jpg","0,1,1,0,1,1,1",1))
exam.push(new Model.Exam("Экономика и юриспруденция.",1,1,moment("11/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate()
,30,1,"Описание короткое","Описание 3","exam1.jpg","1,1,1,1,1,1,1",1))
exam.push(new Model.Exam("Экономика и юриспруденция.",1,1,moment("12/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate()
,30,1,"Описание короткое","Описание 4","exam1.jpg","1,1,0,0,1,1,1",1))
exam.push(new Model.Exam("Экономика и юриспруденция.",1,1,moment("13/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate()
,30,1,"Описание короткое","Описание 5","exam1.jpg","1,1,1,1,1,1,1",1))
exam.push(new Model.Exam("Экономика и юриспруденция.",1,1,moment("14/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate()
,30,1,"Описание короткое","Описание 6","exam1.jpg","1,1,1,1,1,1,1",1))
exam.push(new Model.Exam("Экономика и юриспруденция.",1,1,moment("09/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate()
,30,1,"Описание короткое","Описание 7","exam1.jpg","1,1,1,1,1,1,1",1))
exam.push(new Model.Exam("Экономика и юриспруденция.",1,1,moment("15/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate()
,30,1,"Описание короткое","Описание 8","exam1.jpg","1,1,1,1,1,1,1",1))
exam.push(new Model.Exam("Экономика и юриспруденция.",1,1,moment("09/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate()
,30,1,"Описание короткое","Описание 9","exam1.jpg","1,1,1,1,1,1,1",1))
exam.push(new Model.Exam("Экономика и юриспруденция.",1,1,moment("09/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate()
,30,1,"Описание короткое","Описание 10","exam1.jpg","1,1,1,1,1,1,1",1))

//ExamDocument
//ExamId,ExamFile,Status
var examdocument = []
examdocument.push(new Model.ExamDocument(1,"file1.pdf",1))
examdocument.push(new Model.ExamDocument(1,"file2.doc",1))
examdocument.push(new Model.ExamDocument(1,"file3.pdf",1))
examdocument.push(new Model.ExamDocument(2,"file1.pdf",1))
examdocument.push(new Model.ExamDocument(2,"file2.doc",1))
examdocument.push(new Model.ExamDocument(2,"file3.pdf",1))
examdocument.push(new Model.ExamDocument(2,"file3.doc",1))


//examScore
//ExamId,StudentId,QuestionId,Score1,Score2,Status
var examscore= []
examscore.push(new Model.ExamScore(1,2,1,20,22,1));
examscore.push(new Model.ExamScore(1,3,1,30,33,1));
examscore.push(new Model.ExamScore(1,4,1,40,44,1));

//examComment
//ExamId,StudentId,QuestionId,Comment,Status
var examcomment = []
examcomment.push(new Model.ExamComment(1,1,1,"Comment 1",1));
examcomment.push(new Model.ExamComment(1,1,1,"Comment 2",1));
examcomment.push(new Model.ExamComment(1,1,1,"Comment 3",1));

//examRating
//ExamId,StudentId,Ratting,Comment,Status
var examratting = []
examratting.push(new Model.ExamRatting(1,1,4,"Comment 1",1));
examratting.push(new Model.ExamRatting(1,1,5,"Comment 2",1));
examratting.push(new Model.ExamRatting(1,1,4,"Comment 3",1));


//SubGroup
//Title,GroupId,Status
var subgroup= [];
subgroup.push( new Model.SubGroup("МА-316",1,1));
subgroup.push( new Model.SubGroup("МА-317",1,1));
subgroup.push( new Model.SubGroup("МА-318",1,1));

//SubGroupStudent
//SubGroupId,StudentId,Status
   

var subgroupstudent = [];
subgroupstudent.push(new Model.SubGroupStudent(1,"faf92dbf-e7c3-4dc0-9f6c-d2847343dd1c",1));
subgroupstudent.push(new Model.SubGroupStudent(1,"50a95fc4-1c49-4bc5-b16b-d6353c0eed02",1));
subgroupstudent.push(new Model.SubGroupStudent(1,"efbe3cc4-50f8-4a72-b6e4-fafb7a5f0259",1));
subgroupstudent.push(new Model.SubGroupStudent(1,"b316858c-28ef-4dc8-ad0a-876f009249a9",1));
subgroupstudent.push(new Model.SubGroupStudent(2,"254186da-1857-43da-893b-8a003d0d2fb5",1));
subgroupstudent.push(new Model.SubGroupStudent(2,"a6462eea-b8d1-473b-818b-818b0c7d9764",1));
subgroupstudent.push(new Model.SubGroupStudent(2,"a6462eea-b8d1-473b-818b-818b0c7d9764",1));

//SyatemAlertEvent
var systemalertevent=[]
systemalertevent.push(new Model.SystemAlertEvent("Event 1",1))
systemalertevent.push(new Model.SystemAlertEvent("Event 2",1))
systemalertevent.push(new Model.SystemAlertEvent("Event 3",1))
systemalertevent.push(new Model.SystemAlertEvent("Event 4",1))
//SystemAlert
//EventId,EventType,StudentId,Status
var systemalert = []
systemalert.push(new Model.SystemAlert(1,1,1,"Message 1",moment("09/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate(),1));
systemalert.push(new Model.SystemAlert(2,1,1,"Message 1",moment("09/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate(),1));
systemalert.push(new Model.SystemAlert(3,1,1,"Message 1",moment("09/04/2020 10:07:31","YYYY/MM/DD h:mm:ss").toDate(),1));

//message 
var message = []
message.push(new Model.Message("Message 1",""))
message.push(new Model.Message("Message 2",""))
message.push(new Model.Message("Message 3",""))
message.push(new Model.Message("Message 4",""))
message.push(new Model.Message("Message 5",""))
message.push(new Model.Message("Message 6",""))
message.push(new Model.Message("Message 7",""))
message.push(new Model.Message("Message 8",""))
message.push(new Model.Message("Message 9",""))
message.push(new Model.Message("Message 10",""))
message.push(new Model.Message("Message 11",""))
//room
var room = []
room.push(new Model.Room("Room 1"))
room.push(new Model.Room("Room 2"))
room.push(new Model.Room("Room 3"))
room.push(new Model.Room("Room 4"))
room.push(new Model.Room("Room 5"))
room.push(new Model.Room("Room 6"))
room.push(new Model.Room("Room 7"))
room.push(new Model.Room("Room 8"))
room.push(new Model.Room("Room 9"))

//permission
var permission = []
permission.push(new Model.Permission("Permission 1","Per1"))
permission.push(new Model.Permission("Permission 2","Per2"))
permission.push(new Model.Permission("Permission 3","Per3"))
permission.push(new Model.Permission("Permission 4","Per4"))
permission.push(new Model.Permission("Permission 5","Per5"))
permission.push(new Model.Permission("Permission 6","Per6"))
permission.push(new Model.Permission("Permission 7","Per7"))
permission.push(new Model.Permission("Permission 8","Per8"))
permission.push(new Model.Permission("Permission 9","Per9"))
permission.push(new Model.Permission("Permission 10","Per10"))

//permissionuser
var permissionuser = []
permissionuser.push(new Model.PermissionUser("962c20a8-682c-4c46-b1a5-4e26556f223f","1",1))
permissionuser.push(new Model.PermissionUser("962c20a8-682c-4c46-b1a5-4e26556f223f","2",1))
permissionuser.push(new Model.PermissionUser("962c20a8-682c-4c46-b1a5-4e26556f223f","3",0))
permissionuser.push(new Model.PermissionUser("962c20a8-682c-4c46-b1a5-4e26556f223f","4",1))
permissionuser.push(new Model.PermissionUser("962c20a8-682c-4c46-b1a5-4e26556f223f","5",0))
permissionuser.push(new Model.PermissionUser("962c20a8-682c-4c46-b1a5-4e26556f223f","6",1))
permissionuser.push(new Model.PermissionUser("962c20a8-682c-4c46-b1a5-4e26556f223f","7",1))
permissionuser.push(new Model.PermissionUser("962c20a8-682c-4c46-b1a5-4e26556f223f","8",0))
permissionuser.push(new Model.PermissionUser("962c20a8-682c-4c46-b1a5-4e26556f223f","9",1))
permissionuser.push(new Model.PermissionUser("962c20a8-682c-4c46-b1a5-4e26556f223f","10",1))

async function run(){
   
    await Database.sequelize.drop() 
   console.log("All tables dropped!")
    await Database.sequelize.sync()
    console.log("All tables created!")


    await Database.Faculty.bulkCreate(faculty)
    console.log("Faculty table created!")

    await Database.Department.bulkCreate(department)
    console.log("Department table created!")

    await Database.Field.bulkCreate(field)
    console.log("Field table created!")

    
    await Database.User.bulkCreate(user_list)
    console.log("Users table created!")


    await Database.Subject.bulkCreate(subject)
    console.log("Subject table created!")

    await Database.Model.bulkCreate(model)
    console.log("Model table created!")
    
    await Database.Faq.bulkCreate(faq)
    console.log("Faq table created!")

    await Database.Group.bulkCreate(group)
    console.log("Group table created!")

    await Database.GroupStudent.bulkCreate(groupstudent)
    console.log("GroupStudents table created!")

    await Database.GroupRelation.bulkCreate(grouprelation)
    console.log("GroupRelation table created!")

    
    await Database.Question.bulkCreate(question)
    console.log("Question table created!")

    await Database.QuestionAnswer.bulkCreate(questionanswer)
    console.log("QuestionAnswer table created!")
   
    await Database.Variant.bulkCreate(variant)
    console.log("Variant table created!")

    await Database.VariantQuestion.bulkCreate(variantquestion)
    console.log("VariantQuestion table created!")

    await Database.Exam.bulkCreate(exam)
    console.log("Exam table created!")

    await Database.ExamDocument.bulkCreate(examdocument)
    console.log("ExamDocument table created!")

    await Database.ExamRatting.bulkCreate(examratting)
    console.log("ExamRatting table created!")

    await Database.SubGroup.bulkCreate(subgroup)
    console.log("SubGroup table created!")

    await Database.SubGroupStudent.bulkCreate(subgroupstudent)
    console.log("SubGroupStudent table created!")

    await Database.ExamScore.bulkCreate(examscore)
    console.log("ExamScore table created!")

    await Database.ExamComment.bulkCreate(examcomment)
    console.log("ExamComment table created!")
    await Database.SystemAlertEvent.bulkCreate(systemalertevent)
    console.log("SystemAlertEvent table created!")

    await Database.SystemAlert.bulkCreate(systemalert)
    console.log("SystemAlert table created!")
    await Database.Message.bulkCreate(message)
    console.log("message table created!")

    await Database.Room.bulkCreate(room)
    console.log("room table created!")

    await Database.Permission.bulkCreate(permission)
    console.log("Permission table created!")

    await Database.PermissionUser.bulkCreate(permissionuser)
    console.log("PermissionUser table created!")

    var sql_string = fs.readFileSync('./Db/countries.sql', 'utf8');
    await Database.sequelize.query(sql_string);
}
run()

