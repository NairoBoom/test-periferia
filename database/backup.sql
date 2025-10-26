--
-- PostgreSQL database dump
--

\restrict MoKioQkpnshXxlSfQWAggOdErfcRNEk173Qi33ZYRYgTqehvzGNrDVYs8caIL2M

-- Dumped from database version 15.14
-- Dumped by pg_dump version 15.14

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

ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS "FK_e2fe567ad8d305fefc918d44f50";
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS "UQ_fe0bb3f6520ee0469504521e710";
ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS "PK_a9323de3f8bced7539a794b4a37";
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS "PK_a3ffb1c0c8416b9fc6f907b7433";
ALTER TABLE IF EXISTS ONLY public.posts DROP CONSTRAINT IF EXISTS "PK_2829ac61eff60fcec60d7274b9e";
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.posts;
DROP TABLE IF EXISTS public.likes;
DROP EXTENSION IF EXISTS "uuid-ossp";
--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" uuid NOT NULL,
    "postId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    message text NOT NULL,
    "userId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    alias character varying NOT NULL,
    "birthDate" date NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes (id, "userId", "postId", "createdAt") FROM stdin;
e94d7e90-1b7d-47fd-bc7c-99dd9290164c	3a3c8854-0ec5-4163-9b62-5b976e587a8e	b8d1e13f-cb80-406d-b7d7-95d8ff2fead5	2025-10-24 23:05:12.227472
98f3f477-8685-476e-aa2c-0a63511136d8	3a3c8854-0ec5-4163-9b62-5b976e587a8e	28edeba9-58af-4f74-b42f-64381feac8ed	2025-10-25 00:40:25.546629
444a7e9a-9003-4a57-8ac6-27197dd014a6	3a3c8854-0ec5-4163-9b62-5b976e587a8e	a1539ef0-e0e5-4f74-ac61-696e79fe27ad	2025-10-25 00:40:26.375312
cb256eb2-aadc-470a-9bee-a6d6951893a0	4b950558-b842-43dc-8ef8-0def41a50966	b8d1e13f-cb80-406d-b7d7-95d8ff2fead5	2025-10-25 00:40:42.801661
cfce8d51-1d1e-4932-9209-9c7307e44255	4b950558-b842-43dc-8ef8-0def41a50966	28edeba9-58af-4f74-b42f-64381feac8ed	2025-10-25 00:40:43.515696
8d6d7fd3-0977-4db7-8238-6690914e37c4	4b950558-b842-43dc-8ef8-0def41a50966	a1539ef0-e0e5-4f74-ac61-696e79fe27ad	2025-10-25 00:40:44.700913
f1eb2355-4572-4bd0-a708-ed72126132d9	4b950558-b842-43dc-8ef8-0def41a50966	d20b37ef-ef76-4afc-9997-93b0c3d538df	2025-10-25 00:40:46.498181
1680dc81-7031-4669-9eda-d5a67399db50	4b950558-b842-43dc-8ef8-0def41a50966	50717489-8fa6-45ee-bb7a-5add5f0e3699	2025-10-25 00:40:47.137478
7bf8d32c-c961-4b8a-903f-85ea6b6d4163	4b950558-b842-43dc-8ef8-0def41a50966	ea39cfea-56da-4311-a157-3c6105735403	2025-10-25 01:01:15.829807
958e644f-4b2b-423d-a679-23a7780c73f7	3a3c8854-0ec5-4163-9b62-5b976e587a8e	a2db5ed6-4004-4bc1-9727-3abe0945c0ed	2025-10-25 01:13:17.940679
12f97660-770b-4c08-ace6-eb2d50d2b4e4	3a3c8854-0ec5-4163-9b62-5b976e587a8e	af4cf108-c091-44e0-aab7-66c2fc2151e2	2025-10-25 01:13:20.853039
202ee5c7-1cc8-4432-8cf1-eb3b42e008eb	3a3c8854-0ec5-4163-9b62-5b976e587a8e	ea39cfea-56da-4311-a157-3c6105735403	2025-10-25 01:13:23.46016
6f0bad03-1ea2-4818-85bd-b05c227029df	3a3c8854-0ec5-4163-9b62-5b976e587a8e	d20b37ef-ef76-4afc-9997-93b0c3d538df	2025-10-25 01:21:42.175684
8a6cb231-740c-4ccb-b05a-7f1950d38af8	3a3c8854-0ec5-4163-9b62-5b976e587a8e	50717489-8fa6-45ee-bb7a-5add5f0e3699	2025-10-25 01:26:26.747024
8170e03c-bdd7-4380-8375-5de830e88faa	e50a483d-5c3d-495f-97e0-9ce9f7a134f5	7516158a-6be0-4bc5-9e19-c812e5a71699	2025-10-25 01:26:52.689004
356a07d2-f414-4046-a3bf-b23e52b357bd	e50a483d-5c3d-495f-97e0-9ce9f7a134f5	a2db5ed6-4004-4bc1-9727-3abe0945c0ed	2025-10-25 01:26:54.870468
8c5e9550-be59-468a-af88-f949f5506c76	e50a483d-5c3d-495f-97e0-9ce9f7a134f5	af4cf108-c091-44e0-aab7-66c2fc2151e2	2025-10-25 01:26:55.562177
8ae7222c-fbcf-4e25-8bb0-976ab98013d6	e50a483d-5c3d-495f-97e0-9ce9f7a134f5	a1539ef0-e0e5-4f74-ac61-696e79fe27ad	2025-10-25 01:26:56.836714
12d6f12e-e7ef-4729-9d99-9275bcad874a	e50a483d-5c3d-495f-97e0-9ce9f7a134f5	28edeba9-58af-4f74-b42f-64381feac8ed	2025-10-25 01:26:57.58299
ccf00b98-4375-45cf-a55d-a529039b73d2	e50a483d-5c3d-495f-97e0-9ce9f7a134f5	b8d1e13f-cb80-406d-b7d7-95d8ff2fead5	2025-10-25 01:26:58.856712
91ec08e4-4b3f-4073-b5b4-e43e1513c8af	e50a483d-5c3d-495f-97e0-9ce9f7a134f5	d20b37ef-ef76-4afc-9997-93b0c3d538df	2025-10-25 01:27:00.176767
5add73b6-e895-4122-af54-ec83bef21d2d	e50a483d-5c3d-495f-97e0-9ce9f7a134f5	50717489-8fa6-45ee-bb7a-5add5f0e3699	2025-10-25 01:27:00.815398
f919d488-cf07-43d7-9897-21b3f2c9b9f4	3a3c8854-0ec5-4163-9b62-5b976e587a8e	7516158a-6be0-4bc5-9e19-c812e5a71699	2025-10-25 03:37:07.13328
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, message, "userId", "createdAt") FROM stdin;
50717489-8fa6-45ee-bb7a-5add5f0e3699	Esta es mi primera publicación en la red social. Espero que les guste el contenido que estaré compartiendo.	3a3c8854-0ec5-4163-9b62-5b976e587a8e	2025-10-24 22:59:24.376589
d20b37ef-ef76-4afc-9997-93b0c3d538df	Hoy fue un gran día. Aprendí muchas cosas nuevas sobre desarrollo de software y arquitecturas de microservicios.	4b950558-b842-43dc-8ef8-0def41a50966	2025-10-24 22:59:24.383181
b8d1e13f-cb80-406d-b7d7-95d8ff2fead5	Compartiendo algunos tips de programación que me han ayudado mucho en mis proyectos recientes.	e50a483d-5c3d-495f-97e0-9ce9f7a134f5	2025-10-24 22:59:24.384933
28edeba9-58af-4f74-b42f-64381feac8ed	El trabajo en equipo es fundamental para lograr grandes resultados. Agradecido con mi equipo de desarrollo.	2dd8b77c-7551-4e20-bc92-d92fc50bbade	2025-10-24 22:59:24.386514
a1539ef0-e0e5-4f74-ac61-696e79fe27ad	Explorando nuevas tecnologías y frameworks. La industria del software siempre está en constante evolución.	fbaca24f-c93c-4017-9b11-71a3f16c21d4	2025-10-24 22:59:24.388259
ea39cfea-56da-4311-a157-3c6105735403	Probando tecnologia del presente año	3a3c8854-0ec5-4163-9b62-5b976e587a8e	2025-10-25 00:32:59.84882
a2db5ed6-4004-4bc1-9727-3abe0945c0ed	Llegando a Casa	3a3c8854-0ec5-4163-9b62-5b976e587a8e	2025-10-25 01:02:39.697867
af4cf108-c091-44e0-aab7-66c2fc2151e2	Como están !!!	3a3c8854-0ec5-4163-9b62-5b976e587a8e	2025-10-25 01:10:31.58305
7516158a-6be0-4bc5-9e19-c812e5a71699	Prueba de comentario	3a3c8854-0ec5-4163-9b62-5b976e587a8e	2025-10-25 01:13:37.821659
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, "firstName", "lastName", alias, "birthDate", "createdAt") FROM stdin;
3a3c8854-0ec5-4163-9b62-5b976e587a8e	jperez	$2a$10$cWRtDgkF4P/4Dwl6eGG8mOo3SRBg5KysefLlna3E2px782xvgchPa	Juan	Perez	juanito	1995-03-15	2025-10-25 03:59:20.416223
4b950558-b842-43dc-8ef8-0def41a50966	mgonzalez	$2a$10$zx4T2S8TTSUpJOGw8ooxEOR6hE3DPP7WH04zXzCwPRgdIpmuJmNZi	Maria	González	mary	1998-07-22	2025-10-25 03:59:20.425976
e50a483d-5c3d-495f-97e0-9ce9f7a134f5	crodriguez	$2a$10$Uu3PLG1JJ.4YP6sB8NPFA.4xiNcjESfjAhm4gP7CMUFpGyhQ27M8a	Carlos	Rodriguez	carlitos	1992-11-08	2025-10-25 03:59:20.428881
2dd8b77c-7551-4e20-bc92-d92fc50bbade	lmartinez	$2a$10$2W9F1a1Y0Hdm6iDPy.Q2KeCLJWjOIknAoQ8uSPSzcEcSqcaNuFlx6	Laura	Martinez	lau	1997-05-30	2025-10-25 03:59:20.431064
fbaca24f-c93c-4017-9b11-71a3f16c21d4	dlopez	$2a$10$hXYEeezoMSs2Gs6FwIwv7OnI.HUKxUEC9tMN9wCiDrO8DuY/gPh8C	Diego	Lopez	diegol	1994-09-12	2025-10-25 03:59:20.433584
\.


--
-- Name: posts PK_2829ac61eff60fcec60d7274b9e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: likes PK_a9323de3f8bced7539a794b4a37; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY (id);


--
-- Name: users UQ_fe0bb3f6520ee0469504521e710; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);


--
-- Name: likes FK_e2fe567ad8d305fefc918d44f50; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT "FK_e2fe567ad8d305fefc918d44f50" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- PostgreSQL database dump complete
--

\unrestrict MoKioQkpnshXxlSfQWAggOdErfcRNEk173Qi33ZYRYgTqehvzGNrDVYs8caIL2M

