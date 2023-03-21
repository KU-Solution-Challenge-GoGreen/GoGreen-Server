--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.vegan_type_ingredient_category DROP CONSTRAINT vegan_type_ingredient_category_type_id_fkey;
ALTER TABLE ONLY public.vegan_type_ingredient_category DROP CONSTRAINT vegan_type_ingredient_category_category_id_fkey;
ALTER TABLE ONLY public.recipe DROP CONSTRAINT recipe_user_id_fkey;
ALTER TABLE ONLY public.recipe_step DROP CONSTRAINT recipe_step_recipe_id_fkey;
ALTER TABLE ONLY public.recipe_ingredient DROP CONSTRAINT recipe_ingredient_recipe_id_fkey;
ALTER TABLE ONLY public.recipe_ingredient DROP CONSTRAINT recipe_ingredient_ingredient_id_fkey;
ALTER TABLE ONLY public.recipe_bookmark DROP CONSTRAINT recipe_bookmark_user_id_fkey;
ALTER TABLE ONLY public.recipe_bookmark DROP CONSTRAINT recipe_bookmark_recipe_id_fkey;
ALTER TABLE ONLY public.meal DROP CONSTRAINT meal_user_id_fkey;
ALTER TABLE ONLY public.meal DROP CONSTRAINT meal_recipe_id_fkey;
ALTER TABLE ONLY public.ingredient DROP CONSTRAINT ingredient_category_id_fkey;
DROP INDEX public.user_name_key;
DROP INDEX public.recipe_step_recipe_id_index_key;
DROP INDEX public.meal_user_id_idx;
ALTER TABLE ONLY public.vegan_type DROP CONSTRAINT vegan_type_pkey;
ALTER TABLE ONLY public.vegan_type_ingredient_category DROP CONSTRAINT vegan_type_ingredient_category_pkey;
ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
ALTER TABLE ONLY public.recipe_step DROP CONSTRAINT recipe_step_pkey;
ALTER TABLE ONLY public.recipe DROP CONSTRAINT recipe_pkey;
ALTER TABLE ONLY public.recipe_ingredient DROP CONSTRAINT recipe_ingredient_pkey;
ALTER TABLE ONLY public.recipe_bookmark DROP CONSTRAINT recipe_bookmark_pkey;
ALTER TABLE ONLY public.meal DROP CONSTRAINT meal_pkey;
ALTER TABLE ONLY public.ingredient DROP CONSTRAINT ingredient_pkey;
ALTER TABLE ONLY public.ingredient_category DROP CONSTRAINT ingredient_category_pkey;
ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
DROP TABLE public.vegan_type_ingredient_category;
DROP TABLE public.vegan_type;
DROP TABLE public."user";
DROP TABLE public.recipe_step;
DROP TABLE public.recipe_ingredient;
DROP TABLE public.recipe_bookmark;
DROP TABLE public.recipe;
DROP TABLE public.meal;
DROP TABLE public.ingredient_category;
DROP TABLE public.ingredient;
DROP TABLE public._prisma_migrations;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: ingredient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredient (
    id text NOT NULL,
    category_id text NOT NULL,
    name text NOT NULL,
    carbon_footprint double precision DEFAULT 0 NOT NULL
);


ALTER TABLE public.ingredient OWNER TO postgres;

--
-- Name: ingredient_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredient_category (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.ingredient_category OWNER TO postgres;

--
-- Name: meal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meal (
    id text NOT NULL,
    user_id text NOT NULL,
    recipe_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    title text NOT NULL,
    description text,
    photo text,
    date date NOT NULL
);


ALTER TABLE public.meal OWNER TO postgres;

--
-- Name: recipe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe (
    id text NOT NULL,
    user_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    name text NOT NULL,
    duration integer DEFAULT 0 NOT NULL,
    carbon_footprint double precision DEFAULT 0 NOT NULL
);


ALTER TABLE public.recipe OWNER TO postgres;

--
-- Name: recipe_bookmark; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe_bookmark (
    id text NOT NULL,
    user_id text NOT NULL,
    recipe_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.recipe_bookmark OWNER TO postgres;

--
-- Name: recipe_ingredient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe_ingredient (
    id text NOT NULL,
    recipe_id text NOT NULL,
    ingredient_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.recipe_ingredient OWNER TO postgres;

--
-- Name: recipe_step; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe_step (
    id text NOT NULL,
    recipe_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    index integer DEFAULT 1 NOT NULL,
    description text NOT NULL,
    photo text
);


ALTER TABLE public.recipe_step OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    name text NOT NULL,
    photo text
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: vegan_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vegan_type (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.vegan_type OWNER TO postgres;

--
-- Name: vegan_type_ingredient_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vegan_type_ingredient_category (
    id text NOT NULL,
    type_id text NOT NULL,
    category_id text NOT NULL
);


ALTER TABLE public.vegan_type_ingredient_category OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
e58cb7f5-1e75-44ef-904b-de0d27f62046	a8d34da4f25fc9929231dc043e221cfb33b5f86001c8be41408bc77886f23ed5	2023-03-07 09:34:14.94981+00	20230226145442_init	\N	\N	2023-03-07 09:34:14.767859+00	1
afda6f08-c2a8-4805-bca9-53d5148ee9fe	857540138ceb2ae571f37519ab355211d03f8fa8e36965e9878f64bc3e76a97a	2023-03-07 09:34:15.268362+00	20230306083432_change_about_carbon_footprint_and_user_s_vegan_type	\N	\N	2023-03-07 09:34:14.965106+00	1
98abf8db-8d67-46ff-bbbe-76179e49e43d	776f542216aabb9625ac70e8f0ec0185865079fc64161149f6f9c775c51a02fb	2023-03-07 09:34:15.323064+00	20230307042159_remove_type_id_from_recipe	\N	\N	2023-03-07 09:34:15.283319+00	1
88c48e0a-f6b7-423f-8c9d-a3fb90f22e24	cccefdeedb66698452f741749f95cd6f03c644f23e88d96a12fe128a9f918042	2023-03-17 08:16:47.52768+00	20230317024215_add_index_to_meal_table_and_change_time_to_date	\N	\N	2023-03-17 08:16:47.455447+00	1
\.


--
-- Data for Name: ingredient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredient (id, category_id, name, carbon_footprint) FROM stdin;
eda99b44-fc83-4664-820d-f1d2e01c86b4	21ae0459-85ae-4616-af06-61ca4730221c	Broccoli	0.055
efa481c9-8d91-49c5-bbd6-8c4e514863b9	21ae0459-85ae-4616-af06-61ca4730221c	Carrots	0.018
67f79a53-30e2-4ad2-adfe-0ea8da194539	21ae0459-85ae-4616-af06-61ca4730221c	Cabbage	0.061
de2124f6-90b9-4a26-91cf-1ac529064725	21ae0459-85ae-4616-af06-61ca4730221c	Spinach	0.021
ee54f943-2dee-4386-a1c5-972837f908c5	21ae0459-85ae-4616-af06-61ca4730221c	Bell peppers	0.2
479be6b4-523e-429c-8735-c2d33d808813	21ae0459-85ae-4616-af06-61ca4730221c	Tomatoes	0.063
1ba7c5f7-c24b-4fcb-bb4c-26c6583dfc7d	21ae0459-85ae-4616-af06-61ca4730221c	Cauliflower	0.044
0035238f-7d78-45a6-b903-333b8d6ef4f3	21ae0459-85ae-4616-af06-61ca4730221c	Kale	0.062
7b253ec4-4d34-48e6-bfe9-1a25e9ff1429	21ae0459-85ae-4616-af06-61ca4730221c	Beets	0.052
e259229b-597e-4fa1-8565-efeb17972620	21ae0459-85ae-4616-af06-61ca4730221c	Asparagus	0.124
5608fc02-e305-4d4b-b49c-3a6c9c9f8cc5	21ae0459-85ae-4616-af06-61ca4730221c	Brussels sprouts	0.058
20c1438c-dca3-43af-bf67-2455c727b6d7	21ae0459-85ae-4616-af06-61ca4730221c	Artichokes	0.19
d791f95e-1d47-4b7a-ba7a-aca610b0d6a8	21ae0459-85ae-4616-af06-61ca4730221c	Corn	0.25
e5feca84-e1d7-45d1-832e-41ac81b5b356	21ae0459-85ae-4616-af06-61ca4730221c	Peas	0.16
0c26ebd8-1d5b-46c7-a377-c6142b60b4a1	21ae0459-85ae-4616-af06-61ca4730221c	Green beans	0.1
666f0b42-2668-4925-8215-0b0cbc9c04ef	21ae0459-85ae-4616-af06-61ca4730221c	Radishes	0.025
78e5efda-52d4-4dd3-b19c-42f542260922	21ae0459-85ae-4616-af06-61ca4730221c	Turnips	0.027
6e8a295b-0aa0-4de6-92cf-a4b0a7054008	21ae0459-85ae-4616-af06-61ca4730221c	Eggplant	0.049
0ed2d2c9-9c29-4732-858a-55db93458c7d	21ae0459-85ae-4616-af06-61ca4730221c	Zucchini	0.03
ad0998e3-d468-4c64-8b4d-187bbe413750	21ae0459-85ae-4616-af06-61ca4730221c	Squash	0.05
24e4a058-da1c-4e22-b44e-fe8ce8976d74	21ae0459-85ae-4616-af06-61ca4730221c	Cucumbers	0.03
fa02f67f-bd83-4262-9321-a332375c4f97	21ae0459-85ae-4616-af06-61ca4730221c	Onions	0.03
b91f19ce-3054-4772-80a9-7f843a8c889f	21ae0459-85ae-4616-af06-61ca4730221c	Garlic	0.02
cf49733c-4e09-4d8a-a36c-f3672750bb98	21ae0459-85ae-4616-af06-61ca4730221c	Potatoes	0.09
c232799f-001c-4460-8fa0-9714ab7a969c	21ae0459-85ae-4616-af06-61ca4730221c	Sweet potatoes	0.055
103e1b46-2cfe-4f59-be1c-e31b21ad8986	21ae0459-85ae-4616-af06-61ca4730221c	Pumpkins	0.05
aa73bad8-7e8f-4079-956f-ea859a25abbe	21ae0459-85ae-4616-af06-61ca4730221c	Butternut squash	0.04
1af21eec-ea25-4710-a200-5a08cf1a546b	21ae0459-85ae-4616-af06-61ca4730221c	Acorn squash	0.035
d458d8ec-c63d-47c9-8c76-670fb4a3a7f8	21ae0459-85ae-4616-af06-61ca4730221c	Watercress	0.005
8e196517-c0d6-4e62-b16d-1d139b3b07b7	21ae0459-85ae-4616-af06-61ca4730221c	Arugula	0.02
bb0c1b1a-92b5-4c92-9634-17ecd02de09c	21ae0459-85ae-4616-af06-61ca4730221c	Collard greens	0.05
f73ad6f5-588f-429c-a124-c7dc3c9339e7	21ae0459-85ae-4616-af06-61ca4730221c	Mustard greens	0.025
3986b600-28dc-45bb-9c4c-039c87807ce4	21ae0459-85ae-4616-af06-61ca4730221c	Swiss chard	0.12
13de98c3-831f-4abb-8e9c-0c26cae66e9f	21ae0459-85ae-4616-af06-61ca4730221c	Endive	0.07
595ec8cc-ef66-4d79-a0b5-2e1603f199dc	21ae0459-85ae-4616-af06-61ca4730221c	Escarole	0.07
a7e4a2e2-d709-49a7-bf00-9f5ada35f2a6	21ae0459-85ae-4616-af06-61ca4730221c	Fennel	0.055
ff2e4114-f1f2-490c-9447-de9f05962c96	21ae0459-85ae-4616-af06-61ca4730221c	Leeks	0.05
29b3799e-d1e5-449a-b279-98ea3261cedb	21ae0459-85ae-4616-af06-61ca4730221c	Okra	0.12
af2952a1-4317-4d58-85b6-b8a0f7257ec3	21ae0459-85ae-4616-af06-61ca4730221c	Parsnips	0.06
f4957ef7-6511-4f66-bbff-13ba6b4819f7	21ae0459-85ae-4616-af06-61ca4730221c	Rutabagas	0.045
10ca08d1-fe44-4e60-a2a8-9c6154903cac	21ae0459-85ae-4616-af06-61ca4730221c	Sweet peppers	0.2
d9cc8a01-a2e3-42f6-90d0-bc32d6c7d540	21ae0459-85ae-4616-af06-61ca4730221c	Jalapeños	0.08
467db7ef-f1fe-4d82-a015-633824d96902	21ae0459-85ae-4616-af06-61ca4730221c	Habaneros	0.05
af96f22f-5401-49ac-9427-dab3cba62b7b	21ae0459-85ae-4616-af06-61ca4730221c	Anaheim peppers	0.1
e208ae91-4cf2-49fc-8343-6a62ed631bc4	21ae0459-85ae-4616-af06-61ca4730221c	Serrano peppers	0.07
7697f52c-7820-43bf-946d-28f604eaa895	21ae0459-85ae-4616-af06-61ca4730221c	Cilantro	0.01
c8a2ddd5-118a-482b-a265-e6d4513b8059	21ae0459-85ae-4616-af06-61ca4730221c	Basil	0.03
fd1113ec-bf49-4c96-98b0-b4647fee7ef8	21ae0459-85ae-4616-af06-61ca4730221c	Dill	0.01
47fe1a00-cd61-4e39-9144-1fd61cfcbe12	21ae0459-85ae-4616-af06-61ca4730221c	Mint	0.01
cfc5c879-e929-4675-8c15-3ba1c8dc9207	21ae0459-85ae-4616-af06-61ca4730221c	Thyme	0.02
4612cff6-5802-4ca6-b26e-fb0d155b8dbb	4c45a8e7-0680-45ec-9500-98947520dab5	Chicken eggs	2.7
daf158d0-ac1b-4559-83d8-219e048f67da	4c45a8e7-0680-45ec-9500-98947520dab5	Duck eggs	3.7
75e73d09-ad56-44b0-b9b9-64677f8d0318	4c45a8e7-0680-45ec-9500-98947520dab5	Quail eggs	0.8
ca6ea8fe-8be5-413e-b93e-127b9b51c4a4	4c45a8e7-0680-45ec-9500-98947520dab5	Goose eggs	7.6
e4f0a9e6-0933-46a7-9acd-66bcaf140605	4c45a8e7-0680-45ec-9500-98947520dab5	Emu eggs	25
0f7a9631-22bb-4a5d-b92b-6a99d8087200	4c45a8e7-0680-45ec-9500-98947520dab5	Turkey eggs	3.3
0933dc07-5144-48d8-8ca6-eda2a2f1178a	4c45a8e7-0680-45ec-9500-98947520dab5	Pheasant eggs	9.6
3bc54153-659b-4b24-87eb-ac23e8223c2a	4c45a8e7-0680-45ec-9500-98947520dab5	Ostrich eggs	15.5
04ce49a0-f915-49c6-8548-721eb34eb5df	4c45a8e7-0680-45ec-9500-98947520dab5	Guinea fowl eggs	6.8
a54e7c40-69ae-40bb-8f2c-f53fb64d565b	4c45a8e7-0680-45ec-9500-98947520dab5	Caviar eggs	15
f5a04d5c-c3a1-4673-80f7-a80844002fb5	4c45a8e7-0680-45ec-9500-98947520dab5	Sea urchin eggs	15
8ec16424-fe09-410b-b82b-01bf75135b06	4c45a8e7-0680-45ec-9500-98947520dab5	Shrimp eggs	15
c2dd4a3d-2980-4efd-8acc-7231bed43e00	a930bdc3-c67c-43a9-98af-1531206601ef	Milk	0.6
51c5a3a4-ea22-41fd-9f6f-aafad05f57e2	a930bdc3-c67c-43a9-98af-1531206601ef	Yogurt	0.9
d16673ff-2b01-4959-abbc-d089963e4906	a930bdc3-c67c-43a9-98af-1531206601ef	Cheese	10
0e18aed3-b2ec-4356-9541-cac6170db89c	a930bdc3-c67c-43a9-98af-1531206601ef	Butter	6.4
f9b957ad-41a0-4740-a2e0-df5700839ba8	a930bdc3-c67c-43a9-98af-1531206601ef	Sour cream	2.2
8be18c98-ab6c-4de9-9e64-7ef85a389671	a930bdc3-c67c-43a9-98af-1531206601ef	Cottage cheese	1.9
c2f22746-b706-4f65-8548-dde273b5eb25	a930bdc3-c67c-43a9-98af-1531206601ef	Cream cheese	4.4
48f38160-3d62-4dc9-953b-73582731bbcb	a930bdc3-c67c-43a9-98af-1531206601ef	Ice cream	3.7
876da8db-1581-40b9-bcac-d22173d0af88	a930bdc3-c67c-43a9-98af-1531206601ef	Whipped cream	3.1
ebecd568-371f-473c-b228-1bc197346867	a930bdc3-c67c-43a9-98af-1531206601ef	Evaporated milk	0.7
af06b72d-6709-4e77-af64-e49ca5eab01b	a930bdc3-c67c-43a9-98af-1531206601ef	Condensed milk	1.1
6c212107-9f12-4c80-b592-f6ce52aaafa1	a930bdc3-c67c-43a9-98af-1531206601ef	Powdered milk	1.6
38122aa2-7b8b-4aeb-80ab-8908de70045f	a930bdc3-c67c-43a9-98af-1531206601ef	Buttermilk	0.9
cbbbb07d-a470-41e3-8840-9cc1f3943ce3	a930bdc3-c67c-43a9-98af-1531206601ef	Heavy cream	5.5
20c41678-e27f-4d3d-ba6c-ce0f7dbb00ec	a930bdc3-c67c-43a9-98af-1531206601ef	Clotted cream	3.3
bac3773c-851b-4489-ae25-872457319ab3	a930bdc3-c67c-43a9-98af-1531206601ef	Kefir	0.9
8481e87b-2253-4a3a-8bc1-feb8587445e3	a930bdc3-c67c-43a9-98af-1531206601ef	Ricotta cheese	3.3
7f3f4ce5-aead-4ee9-ac7c-14eefcf7d9e7	a930bdc3-c67c-43a9-98af-1531206601ef	Feta cheese	6.6
97773139-68b7-44bd-acf0-77cf293e8b1b	a930bdc3-c67c-43a9-98af-1531206601ef	Mozzarella cheese	9.5
88ff3d99-7268-48b8-8974-dae18e52b34a	a930bdc3-c67c-43a9-98af-1531206601ef	Parmesan cheese	16.8
1ead5e48-35fd-4fed-8237-8bf0966b8ae9	a930bdc3-c67c-43a9-98af-1531206601ef	Brie cheese	12.9
4aca8730-3d33-4c80-b76f-1f077c0f6ecb	a930bdc3-c67c-43a9-98af-1531206601ef	Gouda cheese	14.1
88cb6269-303c-4b0c-9f6b-02b710a1ed34	a930bdc3-c67c-43a9-98af-1531206601ef	Cheddar cheese	13.5
f4c11572-4155-44bc-9161-05c103865413	a930bdc3-c67c-43a9-98af-1531206601ef	Swiss cheese	15.1
80f1d8d7-4a98-4da3-811b-8f8bd58c552f	a930bdc3-c67c-43a9-98af-1531206601ef	Blue cheese	17.4
5c9fcb20-ece9-4636-99a2-011b4d1a0476	a930bdc3-c67c-43a9-98af-1531206601ef	Camembert cheese	12.9
01b914ef-9046-496a-a2f1-e2b72ff62644	a930bdc3-c67c-43a9-98af-1531206601ef	Creamer	2.6
1f8608f5-e8c4-483f-8b61-ac4dac9f4873	a930bdc3-c67c-43a9-98af-1531206601ef	Milkshake	0.9
1b275487-e1f5-4787-94f0-9ee0a7fe3b0c	a930bdc3-c67c-43a9-98af-1531206601ef	Eggnog	1.1
7b1ef949-760f-4d75-b0f1-02bb4ad01cef	a930bdc3-c67c-43a9-98af-1531206601ef	Lassi	0.8
db697e29-0417-49b8-9b44-865b9095c87f	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Crab	5.7
d54605e1-0627-46d8-8d98-268e2c757023	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Lobster	4.9
0f37ebfc-0928-41b0-8980-b8f485ba2a16	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Shrimp	3.8
b6850944-1cd4-44f2-a8c0-43e2bc2afac9	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Clams	1.9
641b5fa3-ce9d-4340-abb6-bb403e82b6b5	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Oysters	1.8
9e226384-e625-4960-ba52-134521944a0e	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Mussels	1.7
63ecb597-5e9b-41c7-8eda-fef0ec66ff72	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Scallops	3.3
24526133-e33e-4eae-8b83-dfe13510a62a	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Squid	1.9
97673c26-8a6a-4c95-9666-6524cad11bff	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Octopus	2.2
536e49c1-ec04-45c6-856e-0135bc980ba2	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Abalone	9.1
41064ffc-6a46-47f6-93b2-62c9c96e52d6	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Anchovy	1.4
8004027d-7d17-412e-866e-41e6f99ee0a2	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Caviar	8.9
63413147-bb92-469b-9768-0ece708178b2	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Cod	2.8
0d4a0c99-8264-4199-8525-ff38dcaa2c8d	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Eel	5.8
e0f03e36-b540-4113-94c3-0fcb35dbb6a7	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Flounder	2.8
9a471fe2-f95a-449c-a8fc-3b1cad82225e	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Haddock	2.8
7e3e3d61-b2ff-4546-b14b-b9318fcb49c0	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Halibut	4.9
2750537f-4953-4d7c-bdb8-81879199196c	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Mahi-mahi	4.1
f4963bad-76ce-49c7-8c40-73f0e3849a21	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Monkfish	6.1
ff157388-06b3-4dd6-a6cb-a9c360ecaf19	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Salmon	3.9
2eec7d79-3e3c-4ffe-87e4-ec68bc2dd54d	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Sardines	1.9
2bdd9614-9e06-4686-bc8a-b1dbf2da0f7d	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Sea bass	3.7
7487c64b-b869-43d0-831f-0674a75c5aae	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Snapper	4.1
9c70280d-983f-4f20-9d8f-10bbf873be35	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Swordfish	6.1
8394e281-bb47-4273-8204-e325bb2207a1	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Tilapia	2.8
c0073680-84f0-4d97-bf4e-5f8028370f8d	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Trout	3.8
c70ea8f2-6300-48b1-9d26-2ab7ba14c5df	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Tuna	6.1
0413271a-999d-4e50-aaf4-533587da5626	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Catfish	2.5
8a6b8539-c6d2-4d2b-9c45-2a7e802ad87b	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Mackerel	3.3
e1981fff-e973-4905-a338-52cb465771c5	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Herring	2
536f72c9-d9d3-4e80-b51a-83cb26fdab5c	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Oyster	1.8
a3aa45a2-8dc4-4f6f-a00f-19ab23b08121	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Prawns	3.8
5abf7239-524a-4120-a156-437823019b39	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Crawfish	1.9
4f317db0-a7aa-4470-bd54-48ad19cbf7f1	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Calamari	2.2
c5ff826b-c473-46f3-bebc-74f456625409	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Dungeness crab	5.7
e2a22073-3651-4f74-9c16-846348597e2e	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	King crab	4.9
f44b1630-159d-4f2f-aced-e36010a3e7aa	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Snow crab	4.9
1b6ea385-a45e-4b4a-88ee-bf0335a2a382	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Soft-shell crab	5.7
d5350aca-8630-46b2-b132-b96a457d3e9d	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Squid rings	1.9
8b16f218-d75a-45e5-a788-54ddfbdf5729	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Lobster tails	4.9
7a4d963c-692a-4039-87d8-eb5c957f1518	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Jumbo shrimp	3.8
7c254a41-b528-4379-aa01-4e3275bcf573	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Bay scallops	3.3
e205ea21-6af9-4edb-8cf9-42c6895701de	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Manila clams	1.9
4df6f66d-6df0-413e-a8e3-375deb728225	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Geoduck	11.3
e8706c97-2c78-4e8f-a54f-34e3e98ae97e	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Periwinkle	1.9
05730ed2-c598-481a-8a7e-89524866dddb	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Razor clams	1.9
b7cf8073-3ba7-40d2-8881-e2d182001e74	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Conch	6.1
d71f8be7-9f0c-4d9e-8623-4ce6b00761b2	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Whelk	6.1
0774e44e-e673-4171-ae5b-0aa39a770c0d	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Sea urchin	5.7
2da415c2-b9a1-43d8-a8dc-ec46dc1abd24	dc4d6d89-d40e-44ef-89b4-6a97724ff29e	Barnacles	2.2
52ef617c-d9d4-4506-9a13-bdf28eba9a08	18bba908-745c-4d3b-9505-ac27926a4b0b	Chicken	6.9
9c6c8930-31a8-4149-a06f-037656b50fda	18bba908-745c-4d3b-9505-ac27926a4b0b	Turkey	5.1
e13b6900-7c43-4ad0-a8fe-61bd58567b0f	18bba908-745c-4d3b-9505-ac27926a4b0b	Duck	11.4
0199b694-c99a-4e69-86b1-f47c547967fa	18bba908-745c-4d3b-9505-ac27926a4b0b	Goose	17.4
427d5b44-5ac6-484c-b862-324e823e9bdd	18bba908-745c-4d3b-9505-ac27926a4b0b	Pheasant	6.3
c06b8b38-c025-413a-9039-7f3e5cf28e48	18bba908-745c-4d3b-9505-ac27926a4b0b	Quail	10.9
0eb42e1c-e388-491a-9bd8-d410c852d791	18bba908-745c-4d3b-9505-ac27926a4b0b	Guinea fowl	6.9
01841073-bb9f-461f-b767-df1604f93eda	18bba908-745c-4d3b-9505-ac27926a4b0b	Cornish hen	6.9
4ec2c16c-e3b5-4a93-8497-32b94f4ff68f	18bba908-745c-4d3b-9505-ac27926a4b0b	Emu	16.4
647a62f5-64ba-42df-a2fe-ff34841c2c66	18bba908-745c-4d3b-9505-ac27926a4b0b	Ostrich	10.9
060937a0-a844-4195-ab02-7a7c75671118	9d383b29-ebda-47b9-889e-941ec7bcf95e	Beef	60
97d6e13b-3c0d-4b6a-8d44-173342edfb69	9d383b29-ebda-47b9-889e-941ec7bcf95e	Pork	7.1
bcbefe19-fd5a-451d-afec-0814ce878958	9d383b29-ebda-47b9-889e-941ec7bcf95e	Lamb	39
60aeb158-e028-47aa-8c5c-d4ebe9c09fb0	9d383b29-ebda-47b9-889e-941ec7bcf95e	Venison	7.6
7813c196-e336-4894-9534-1309e9223fb7	9d383b29-ebda-47b9-889e-941ec7bcf95e	Bison	8.6
a065a198-cbef-4b3f-ab85-efa9b2471941	9d383b29-ebda-47b9-889e-941ec7bcf95e	Rabbit	4.2
0c99b391-07a5-4035-b200-500cb650c74c	9d383b29-ebda-47b9-889e-941ec7bcf95e	Goat	5.5
27328a34-ecc4-4edb-912e-c6e7b38b3471	9d383b29-ebda-47b9-889e-941ec7bcf95e	Horse	27
579881ed-0f77-4756-8aeb-88f7582bc1e0	9d383b29-ebda-47b9-889e-941ec7bcf95e	Elk	4.4
85b4b4a7-7ac0-4597-a6b2-e2f33f98a808	9d383b29-ebda-47b9-889e-941ec7bcf95e	Wild boar	6.1
8f90ee4b-7435-4904-884e-58a6f54a0c70	9d383b29-ebda-47b9-889e-941ec7bcf95e	Kangaroo	3
94a7408d-c79c-4718-b08f-eaaeda40a2fb	9d383b29-ebda-47b9-889e-941ec7bcf95e	Reindeer	3.5
8eb79fa5-8732-4e44-99cc-eb579b286a65	9d383b29-ebda-47b9-889e-941ec7bcf95e	Camel	6.1
6e67505c-33f0-4722-9657-8f8cf7ad9b0c	9d383b29-ebda-47b9-889e-941ec7bcf95e	Water buffalo	1.8
5825735a-3b46-4423-9779-e3cc889dbea5	9d383b29-ebda-47b9-889e-941ec7bcf95e	Yak	3.9
54fa1ff6-46a6-4f3b-9641-2e6915e81647	9d383b29-ebda-47b9-889e-941ec7bcf95e	Caribou	2.9
5ae4f826-9df9-4b2c-b4e9-7f6c87362fe0	9d383b29-ebda-47b9-889e-941ec7bcf95e	Moose	2.5
2cb22cac-8a33-45da-90de-8bd038214d61	9d383b29-ebda-47b9-889e-941ec7bcf95e	Zebra	5.5
f9f116d4-cd78-4c91-a959-8088feb8a040	9d383b29-ebda-47b9-889e-941ec7bcf95e	Crocodile	16.5
f7095f97-b513-492e-9a02-57d134663f3d	9d383b29-ebda-47b9-889e-941ec7bcf95e	Alligator	11.1
5e6ca524-13d0-46b5-b861-94e9e42e4ceb	9d383b29-ebda-47b9-889e-941ec7bcf95e	Turtle	2.2
9fece3bd-852a-460f-993c-60933de3ee04	9d383b29-ebda-47b9-889e-941ec7bcf95e	Frog	0.3
0d830286-579b-4975-b52b-4bc57d41dabf	9d383b29-ebda-47b9-889e-941ec7bcf95e	Escargot	2
\.


--
-- Data for Name: ingredient_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredient_category (id, name) FROM stdin;
21ae0459-85ae-4616-af06-61ca4730221c	vegetable
a930bdc3-c67c-43a9-98af-1531206601ef	dairy
4c45a8e7-0680-45ec-9500-98947520dab5	egg
dc4d6d89-d40e-44ef-89b4-6a97724ff29e	seafood
18bba908-745c-4d3b-9505-ac27926a4b0b	poultry
9d383b29-ebda-47b9-889e-941ec7bcf95e	meat
\.


--
-- Data for Name: meal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meal (id, user_id, recipe_id, created_at, updated_at, title, description, photo, date) FROM stdin;
\.


--
-- Data for Name: recipe; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe (id, user_id, created_at, updated_at, deleted_at, name, duration, carbon_footprint) FROM stdin;
\.


--
-- Data for Name: recipe_bookmark; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe_bookmark (id, user_id, recipe_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: recipe_ingredient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe_ingredient (id, recipe_id, ingredient_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: recipe_step; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe_step (id, recipe_id, created_at, updated_at, index, description, photo) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, created_at, updated_at, deleted_at, name, photo) FROM stdin;
g954HNFgbhe126AfwxG4bgUkz6z2	2023-03-11 07:24:48.575	2023-03-11 07:24:48.575	\N	worjs	\N
nwHl3TaO1sRVkmjlQ7b448TPZWE2	2023-03-15 11:59:40.565	2023-03-15 11:59:40.565	\N		\N
nXHZNAdbxTdZYpEGV26IMAnBXTg1	2023-03-16 16:52:28.76	2023-03-16 16:52:28.76	\N	yejin	\N
AlI9nXJq55S7F0ik6mUaMBm10Me2	2023-03-18 09:41:54.827	2023-03-18 09:41:54.827	\N	hcy	\N
\.


--
-- Data for Name: vegan_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vegan_type (id, name) FROM stdin;
c044d7e6-788e-4331-9a92-8cc3a8e1b12a	Vegan
60c43d08-ee18-4de5-b318-3219012011e9	Pollo
dd799cd5-87d0-4d3a-9d00-1cb64635b1b0	Pesco
f4fe3545-45da-45b6-aec0-1d0e42d84b34	Ovo
270e7138-ddbb-4ab9-a16b-3244bb0795be	Lacto
6c5a8566-cc90-4bb5-bbb8-bb61e2a99138	Lacto-Ovo
fc51eacc-5465-41ab-a8dc-9dbbff457fc5	Flexitarian
\.


--
-- Data for Name: vegan_type_ingredient_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vegan_type_ingredient_category (id, type_id, category_id) FROM stdin;
25995475-d47d-46d3-8413-5b7300971e65	c044d7e6-788e-4331-9a92-8cc3a8e1b12a	21ae0459-85ae-4616-af06-61ca4730221c
dc92f763-78e1-46ef-a6c8-4a5dd361a166	60c43d08-ee18-4de5-b318-3219012011e9	21ae0459-85ae-4616-af06-61ca4730221c
f1dc01f1-dde0-4c57-ab8f-2e7e6aaf1b51	60c43d08-ee18-4de5-b318-3219012011e9	18bba908-745c-4d3b-9505-ac27926a4b0b
18eeee78-c873-4830-863f-3bd9c85e2749	60c43d08-ee18-4de5-b318-3219012011e9	4c45a8e7-0680-45ec-9500-98947520dab5
ee43a1de-6e67-4a4d-b4fe-9d40bfa48869	60c43d08-ee18-4de5-b318-3219012011e9	a930bdc3-c67c-43a9-98af-1531206601ef
898f3527-2952-4f4e-a12d-8e4c9508f6d7	60c43d08-ee18-4de5-b318-3219012011e9	dc4d6d89-d40e-44ef-89b4-6a97724ff29e
9b3d4ebd-a4af-4d24-858b-dff81c00ab9a	dd799cd5-87d0-4d3a-9d00-1cb64635b1b0	21ae0459-85ae-4616-af06-61ca4730221c
c785cf0b-3fcb-49a0-b332-ee84127b6059	dd799cd5-87d0-4d3a-9d00-1cb64635b1b0	dc4d6d89-d40e-44ef-89b4-6a97724ff29e
4c141109-73c6-49e2-8fc8-43fcb4837cc0	dd799cd5-87d0-4d3a-9d00-1cb64635b1b0	4c45a8e7-0680-45ec-9500-98947520dab5
8635bca4-b83b-44c8-8083-6ba46c361dd6	dd799cd5-87d0-4d3a-9d00-1cb64635b1b0	a930bdc3-c67c-43a9-98af-1531206601ef
942e6ecc-8420-45b2-b27a-231a6335661c	f4fe3545-45da-45b6-aec0-1d0e42d84b34	21ae0459-85ae-4616-af06-61ca4730221c
51c0b73a-f5b6-4b16-8272-692ad6bf7c50	f4fe3545-45da-45b6-aec0-1d0e42d84b34	4c45a8e7-0680-45ec-9500-98947520dab5
22cd49d7-717a-42b8-822f-768b7e40e383	270e7138-ddbb-4ab9-a16b-3244bb0795be	21ae0459-85ae-4616-af06-61ca4730221c
e2f3b099-fa44-491d-8ad5-7304f3f6ea60	270e7138-ddbb-4ab9-a16b-3244bb0795be	a930bdc3-c67c-43a9-98af-1531206601ef
c6229558-b8dd-4a69-b5be-747250595085	6c5a8566-cc90-4bb5-bbb8-bb61e2a99138	21ae0459-85ae-4616-af06-61ca4730221c
07e95dd0-859c-4f71-82fc-5b52eb88e4b3	6c5a8566-cc90-4bb5-bbb8-bb61e2a99138	a930bdc3-c67c-43a9-98af-1531206601ef
909c3e55-a07f-403c-9992-90c93cce531b	6c5a8566-cc90-4bb5-bbb8-bb61e2a99138	4c45a8e7-0680-45ec-9500-98947520dab5
410ed6f7-dd4a-4120-864b-ca4550677027	fc51eacc-5465-41ab-a8dc-9dbbff457fc5	21ae0459-85ae-4616-af06-61ca4730221c
a668e883-808c-492e-9086-b53db10402a2	fc51eacc-5465-41ab-a8dc-9dbbff457fc5	18bba908-745c-4d3b-9505-ac27926a4b0b
070518e9-699a-4c16-bc66-e1188af78a84	fc51eacc-5465-41ab-a8dc-9dbbff457fc5	4c45a8e7-0680-45ec-9500-98947520dab5
eb7ae1c7-bd40-4953-a8b9-d3c57da62ac3	fc51eacc-5465-41ab-a8dc-9dbbff457fc5	a930bdc3-c67c-43a9-98af-1531206601ef
6bb1b4e0-62cc-4d19-bd57-6428693afe34	fc51eacc-5465-41ab-a8dc-9dbbff457fc5	dc4d6d89-d40e-44ef-89b4-6a97724ff29e
3168221b-492e-43f1-8dd7-4732b755e77a	fc51eacc-5465-41ab-a8dc-9dbbff457fc5	9d383b29-ebda-47b9-889e-941ec7bcf95e
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: ingredient_category ingredient_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient_category
    ADD CONSTRAINT ingredient_category_pkey PRIMARY KEY (id);


--
-- Name: ingredient ingredient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT ingredient_pkey PRIMARY KEY (id);


--
-- Name: meal meal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal
    ADD CONSTRAINT meal_pkey PRIMARY KEY (id);


--
-- Name: recipe_bookmark recipe_bookmark_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_bookmark
    ADD CONSTRAINT recipe_bookmark_pkey PRIMARY KEY (id);


--
-- Name: recipe_ingredient recipe_ingredient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredient
    ADD CONSTRAINT recipe_ingredient_pkey PRIMARY KEY (id);


--
-- Name: recipe recipe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_pkey PRIMARY KEY (id);


--
-- Name: recipe_step recipe_step_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_step
    ADD CONSTRAINT recipe_step_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: vegan_type_ingredient_category vegan_type_ingredient_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vegan_type_ingredient_category
    ADD CONSTRAINT vegan_type_ingredient_category_pkey PRIMARY KEY (id);


--
-- Name: vegan_type vegan_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vegan_type
    ADD CONSTRAINT vegan_type_pkey PRIMARY KEY (id);


--
-- Name: meal_user_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX meal_user_id_idx ON public.meal USING btree (user_id);


--
-- Name: recipe_step_recipe_id_index_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX recipe_step_recipe_id_index_key ON public.recipe_step USING btree (recipe_id, index);


--
-- Name: user_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_name_key ON public."user" USING btree (name);


--
-- Name: ingredient ingredient_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT ingredient_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.ingredient_category(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: meal meal_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal
    ADD CONSTRAINT meal_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: meal meal_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meal
    ADD CONSTRAINT meal_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: recipe_bookmark recipe_bookmark_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_bookmark
    ADD CONSTRAINT recipe_bookmark_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: recipe_bookmark recipe_bookmark_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_bookmark
    ADD CONSTRAINT recipe_bookmark_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: recipe_ingredient recipe_ingredient_ingredient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredient
    ADD CONSTRAINT recipe_ingredient_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredient(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: recipe_ingredient recipe_ingredient_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredient
    ADD CONSTRAINT recipe_ingredient_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: recipe_step recipe_step_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_step
    ADD CONSTRAINT recipe_step_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: recipe recipe_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vegan_type_ingredient_category vegan_type_ingredient_category_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vegan_type_ingredient_category
    ADD CONSTRAINT vegan_type_ingredient_category_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.ingredient_category(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vegan_type_ingredient_category vegan_type_ingredient_category_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vegan_type_ingredient_category
    ADD CONSTRAINT vegan_type_ingredient_category_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.vegan_type(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: cloudsqlsuperuser
--

REVOKE ALL ON SCHEMA public FROM cloudsqladmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO cloudsqlsuperuser;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: FUNCTION pg_replication_origin_advance(text, pg_lsn); Type: ACL; Schema: pg_catalog; Owner: cloudsqladmin
--

GRANT ALL ON FUNCTION pg_catalog.pg_replication_origin_advance(text, pg_lsn) TO cloudsqlsuperuser;


--
-- Name: FUNCTION pg_replication_origin_create(text); Type: ACL; Schema: pg_catalog; Owner: cloudsqladmin
--

GRANT ALL ON FUNCTION pg_catalog.pg_replication_origin_create(text) TO cloudsqlsuperuser;


--
-- Name: FUNCTION pg_replication_origin_drop(text); Type: ACL; Schema: pg_catalog; Owner: cloudsqladmin
--

GRANT ALL ON FUNCTION pg_catalog.pg_replication_origin_drop(text) TO cloudsqlsuperuser;


--
-- Name: FUNCTION pg_replication_origin_oid(text); Type: ACL; Schema: pg_catalog; Owner: cloudsqladmin
--

GRANT ALL ON FUNCTION pg_catalog.pg_replication_origin_oid(text) TO cloudsqlsuperuser;


--
-- Name: FUNCTION pg_replication_origin_progress(text, boolean); Type: ACL; Schema: pg_catalog; Owner: cloudsqladmin
--

GRANT ALL ON FUNCTION pg_catalog.pg_replication_origin_progress(text, boolean) TO cloudsqlsuperuser;


--
-- Name: FUNCTION pg_replication_origin_session_is_setup(); Type: ACL; Schema: pg_catalog; Owner: cloudsqladmin
--

GRANT ALL ON FUNCTION pg_catalog.pg_replication_origin_session_is_setup() TO cloudsqlsuperuser;


--
-- Name: FUNCTION pg_replication_origin_session_progress(boolean); Type: ACL; Schema: pg_catalog; Owner: cloudsqladmin
--

GRANT ALL ON FUNCTION pg_catalog.pg_replication_origin_session_progress(boolean) TO cloudsqlsuperuser;


--
-- Name: FUNCTION pg_replication_origin_session_reset(); Type: ACL; Schema: pg_catalog; Owner: cloudsqladmin
--

GRANT ALL ON FUNCTION pg_catalog.pg_replication_origin_session_reset() TO cloudsqlsuperuser;


--
-- Name: FUNCTION pg_replication_origin_session_setup(text); Type: ACL; Schema: pg_catalog; Owner: cloudsqladmin
--

GRANT ALL ON FUNCTION pg_catalog.pg_replication_origin_session_setup(text) TO cloudsqlsuperuser;


--
-- Name: FUNCTION pg_replication_origin_xact_reset(); Type: ACL; Schema: pg_catalog; Owner: cloudsqladmin
--

GRANT ALL ON FUNCTION pg_catalog.pg_replication_origin_xact_reset() TO cloudsqlsuperuser;


--
-- Name: FUNCTION pg_replication_origin_xact_setup(pg_lsn, timestamp with time zone); Type: ACL; Schema: pg_catalog; Owner: cloudsqladmin
--

GRANT ALL ON FUNCTION pg_catalog.pg_replication_origin_xact_setup(pg_lsn, timestamp with time zone) TO cloudsqlsuperuser;


--
-- Name: FUNCTION pg_show_replication_origin_status(OUT local_id oid, OUT external_id text, OUT remote_lsn pg_lsn, OUT local_lsn pg_lsn); Type: ACL; Schema: pg_catalog; Owner: cloudsqladmin
--

GRANT ALL ON FUNCTION pg_catalog.pg_show_replication_origin_status(OUT local_id oid, OUT external_id text, OUT remote_lsn pg_lsn, OUT local_lsn pg_lsn) TO cloudsqlsuperuser;


--
-- PostgreSQL database dump complete
--

