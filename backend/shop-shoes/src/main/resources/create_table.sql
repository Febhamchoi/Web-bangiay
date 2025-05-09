create table brand
(
    id       int auto_increment
        primary key,
    name     varchar(255) null,
    logo_url varchar(255) null
);

create table category
(
    id            int auto_increment
        primary key,
    category_name varchar(255) null,
    description   text         null
);

create table product
(
    id             int auto_increment
        primary key,
    brand_id       int          null,
    category_id    int          null,
    name           varchar(255) null,
    description    varchar(255) null,
    original_price int          null,
    selling_price  int          null,
    image_url      varchar(255) null,
    constraint product_ibfk_1
        foreign key (brand_id) references brand (id),
    constraint product_ibfk_2
        foreign key (category_id) references category (id)
);

create index brand_id
    on product (brand_id);

create index category_id
    on product (category_id);

create table product_size
(
    id         int auto_increment
        primary key,
    product_id int null,
    quantity   int null,
    value      int not null,
    constraint product_size_ibfk_1
        foreign key (product_id) references product (id)
);

create index product_id
    on product_size (product_id);

create table user
(
    id         int auto_increment
        primary key,
    last_name  varchar(255) null,
    first_name varchar(255) null,
    phone      varchar(255) null,
    email      varchar(255) null,
    address    varchar(255) null,
    password   varchar(255) null,
    role       varchar(50)  null,
    constraint email
        unique (email)
);

create table cart_items
(
    id         int auto_increment
        primary key,
    user_id    int null,
    quantity   int not null,
    product_id int null,
    constraint cart_items_ibfk_1
        foreign key (user_id) references user (id),
    constraint cart_items_ibfk_2
        foreign key (product_id) references product (id)
);

create index product_id
    on cart_items (product_id);

create index user_id
    on cart_items (user_id);

create table `order`
(
    id         int auto_increment
        primary key,
    user_id    int          null,
    order_date date         null,
    status     int          null,
    comments   varchar(255) null,
    total_sale float(10, 1) null,
    constraint order_ibfk_1
        foreign key (user_id) references user (id)
);

create index user_id
    on `order` (user_id);

create table order_product
(
    id         int auto_increment
        primary key,
    order_id   int null,
    product_id int null,
    quantity   int null,
    constraint order_product_ibfk_1
        foreign key (order_id) references `order` (id),
    constraint order_product_ibfk_2
        foreign key (product_id) references product (id)
);

create index order_id
    on order_product (order_id);

create index product_id
    on order_product (product_id);

create table review
(
    id         int auto_increment
        primary key,
    comment    varchar(255) null,
    star       int          null,
    user_id    int          null,
    product_id int          null,
    constraint review_ibfk_1
        foreign key (user_id) references user (id),
    constraint review_ibfk_2
        foreign key (product_id) references product (id)
);

create index product_id
    on review (product_id);

create index user_id
    on review (user_id);

