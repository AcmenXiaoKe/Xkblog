
create table xk_group (
    gid int primary key auto_increment,
    name varchar(50) not null unique,
    permissions varchar(255)
);
insert into xk_group(name) values ('Super');
create table xk_user (
    uid int primary key auto_increment,
    username varchar (20) not null unique ,
    password varchar (255) not null,
    email varchar (50) unique,
    name varchar (15) not null,
    logged timestamp,
    permissions varchar(255),
    foreign key( permissions ) references xk_group (name)
);

insert into xk_user(username,password,email,name,permissions) values ('admin','$2y$10$hEYQR9YBaO/lisjj20L2DOhq2pNPXCPgK4dum0n.Et/ecyuilfacu','admin@qq.com','admin','Super');

create table xk_options (
    name varchar (255)  not null,
    url varchar (255) not null,
    description varchar (255),
    keywords varchar (255)
);

insert into xk_options (name, url, description, keywords) values ('小柯博客','http://xkblog.xkbk.top/','小柯博客，是专注于业界、互联网、搜索引擎优化、社会化网络、IT技术、谷歌地图、建站、软件等领域的原创IT科技博客，作者小柯。','小柯博客，小柯前端工程师，学习前端');


create table xk_categories (
    crid int primary key auto_increment,
    name varchar (25) not null unique
);
insert into xk_categories(name) values ('默认分类');
insert into xk_categories(name) values ('WEB前端');


create table xk_label (
    laid int primary key auto_increment,
    name varchar(50)
);
insert into xk_label (name)  values('WEB前端');
insert into xk_label (name)  values('JavaScript');
insert into xk_label (name)  values('CSS');
insert into xk_label (name)  values('VUE');

create table xk_article(
    aid int primary key auto_increment,
    title varchar (150) not null,
    author  varchar (15) not null,
    release_date timestamp not null,
    content text not null,
    class varchar (255),
    label varchar (255),
    browse int ,
    praise int ,
    top bool default false,
    recommended bool default false ,
    status bool default true
);
insert into xk_article
(title, author, release_date, content, class, label, browse, praise, top)
values ('测试文章','admin','2021-05-09 18:27:05','<h1>测试文章内容！</h1>','测试子分类','WEB前端|JavaScript|CSS',98,20,true);

insert into xk_article
(title, author, release_date, content, class, label, browse, praise, top,recommended)
values ('测试文章2','admin','2021-05-09 20:27:05','<h1>测试文章内容2！</h1>','默认分类','VUE',98,20,false,true);

insert into xk_article
(title, author, release_date, content, class, label, browse, praise, top,recommended,status)
values ('测试文章3','admin','2021-05-09 20:27:05','<h1>测试文章内容3！</h1>','默认分类','VUE',98,20,false,false,false);


create table xk_comments(
    cid int primary key auto_increment,
    aid int  not null,
    author varchar (20) not null,
    email varchar (50) not null,
    content varchar (255) not null,
    parent int,
    foreign key( aid ) references xk_article (aid)
);

insert into xk_comments (aid, author, email, content) values (1,'admin','admin@qq.com','测试评论2！');
insert into xk_comments (aid, author, email, content,parent) values (1,'admin','admin@qq.com','测试子评论！',1);


create table xk_link(
    id int primary key auto_increment,
    numerical int default 0,
    name varchar (25) not null,
    email varchar (255) not null,
    url varchar (255) not null,
    description varchar (255) not null,
    icon varchar (255)
);

insert into xk_link (numerical, name, email, url, description, icon) values (10,'小柯博客','admin@qq.com','https://xkbk.top','让你学习更加轻松','http://xkblog.xkbk.top/static/home/favicon.ico');
insert into xk_link ( name, email, url, description) values ('小柯博客','admin@qq.com','https://xkbk.top','让你学习更加轻松');

create table xk_slide_show(
    sid int primary key auto_increment,
    numerical int default 0,
    title varchar(25),
    url varchar (255),
    img_url varchar (255)
);
insert into xk_slide_show(numerical, title, url, img_url) values (1,'测试轮播图','https://xkbk.top/','http://p8.qhimg.com/bdr/__85/t019fdada747d0bff14.jpg');