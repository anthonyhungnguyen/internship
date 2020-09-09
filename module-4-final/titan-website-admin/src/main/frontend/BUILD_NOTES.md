# BUILD NOTES

## Các bước build Titan admin website
-   B1: Cài đặt thư viện cần thiết: 
    -   `npm install`
-   B2: Build website và lưu vào thư mục `./build` bằng lệnh: 
    -   `npm run-script build`

## Lỗi conflict version node-sass ở file App.scss
-   Cách fix lỗi:
    -   `npm rebuild node-sass`

## MySQL Script User Role
~~~~sql
create database rpsTitanUserRole;
use rpsTitanUserRole;

create table auth(
	id int NOT NULL AUTO_INCREMENT,
    name nvarchar(255),
	username varchar(255),
    role nvarchar(255),
    status varchar(10),
    primary key(id)
);

create table nav_role(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255),
    roles nvarchar(255),
    primary key(id)
);

insert into rpsTitanUserRole.auth values(1,'ADMIN','ADMIN','Administrator','ON');
insert into rpsTitanUserRole.auth values(2,'Lê Thành Công','conglt','Administrator','ON');
insert into rpsTitanUserRole.auth values(3,'Bùi Mạnh Cường','cuongbm2','Administrator','ON');
insert into rpsTitanUserRole.auth values(4,'Nguyễn Lâm Hoàng Yên','yennlh','Administrator','ON');
insert into rpsTitanUserRole.auth values(5,'Nguyễn Hữu Phong','phongnh','Administrator','ON');

insert into rpsTitanUserRole.nav_role values(1,'Dashboard','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(2,'Events','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(3,'NavManagement','Administrator');
insert into rpsTitanUserRole.nav_role values(4,'RoleManagement','Administrator');
insert into rpsTitanUserRole.nav_role values(5,'Add new event','Administrator');
insert into rpsTitanUserRole.nav_role values(6,'Edit','Administrator');
insert into rpsTitanUserRole.nav_role values(7,'Info','Administrator,Executive');
insert into rpsTitanUserRole.nav_role values(8,'Sources','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(9,'Rules','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(10,'RuleInfo','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(11,'SourceInfo','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(12,'Domains','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(13,'Profiles','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(14,'Tiers','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(15,'Conditions','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(16,'InfoCode','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(17,'Clients','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(18,'DomainInfo','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(19,'ProfileInfo','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(20,'TierInfo','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(21,'ConditionInfo','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(22,'InfoCodeInfo','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(23,'ClientInfo','Administrator,Executive,Customer service');
insert into rpsTitanUserRole.nav_role values(24,'RuleVersionInfo','Administrator,Executive,Customer service');


~~~~
