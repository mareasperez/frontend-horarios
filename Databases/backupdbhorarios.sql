--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-2.pgdg18.04+1)
-- Dumped by pg_dump version 12.2 (Ubuntu 12.2-2.pgdg18.04+1)

-- Started on 2020-06-10 14:10:16 CST

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

--
-- TOC entry 215 (class 1259 OID 16542)
-- Name: area_area_area_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.area_area_area_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.area_area_area_id_seq OWNER TO postgres;

SET default_tablespace = '';

--
-- TOC entry 214 (class 1259 OID 16535)
-- Name: area_area; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.area_area (
    area_id integer DEFAULT nextval('public.area_area_area_id_seq'::regclass) NOT NULL,
    area_nombre character varying(50) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.area_area OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16584)
-- Name: aulas_aula_aula_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aulas_aula_aula_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.aulas_aula_aula_id_seq OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16571)
-- Name: aulas_aula; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aulas_aula (
    aula_nombre character varying(50) NOT NULL,
    aula_id integer DEFAULT nextval('public.aulas_aula_aula_id_seq'::regclass) NOT NULL,
    aula_tipo boolean NOT NULL,
    aula_capacidad integer NOT NULL,
    aula_recinto_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.aulas_aula OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16417)
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16415)
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 202
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- TOC entry 205 (class 1259 OID 16427)
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16425)
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- TOC entry 3385 (class 0 OID 0)
-- Dependencies: 204
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- TOC entry 201 (class 1259 OID 16409)
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16407)
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 200
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- TOC entry 207 (class 1259 OID 16435)
-- Name: auth_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16445)
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16443)
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO postgres;

--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 208
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- TOC entry 206 (class 1259 OID 16433)
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO postgres;

--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 206
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- TOC entry 211 (class 1259 OID 16453)
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16451)
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO postgres;

--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 210
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- TOC entry 220 (class 1259 OID 16613)
-- Name: authtoken_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authtoken_token (
    key character varying(40) NOT NULL,
    created timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.authtoken_token OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16655)
-- Name: carreras_carrera_carrera_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carreras_carrera_carrera_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carreras_carrera_carrera_id_seq OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16642)
-- Name: carreras_carrera; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carreras_carrera (
    carrera_nombre character varying(50) NOT NULL,
    carrera_id integer DEFAULT nextval('public.carreras_carrera_carrera_id_seq'::regclass) NOT NULL,
    carrera_departamento_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    carrera_tipo character varying(1) NOT NULL
);


ALTER TABLE public.carreras_carrera OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16711)
-- Name: componentes_componente_componente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.componentes_componente_componente_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.componentes_componente_componente_id_seq OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16692)
-- Name: componentes_componente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.componentes_componente (
    componente_nombre character varying(100) NOT NULL,
    componente_id integer DEFAULT nextval('public.componentes_componente_componente_id_seq'::regclass) NOT NULL,
    componente_chp integer NOT NULL,
    componente_cht integer NOT NULL,
    componente_ciclo integer NOT NULL,
    componente_area_id integer NOT NULL,
    componente_pde_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    componente_credito integer NOT NULL
);


ALTER TABLE public.componentes_componente OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16742)
-- Name: departamento_departamento_departamento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departamento_departamento_departamento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.departamento_departamento_departamento_id_seq OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16631)
-- Name: departamento_departamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departamento_departamento (
    departamento_nombre character varying(50) NOT NULL,
    departamento_id integer DEFAULT nextval('public.departamento_departamento_departamento_id_seq'::regclass) NOT NULL,
    departamento_facultad_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.departamento_departamento OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16513)
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16511)
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 212
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- TOC entry 199 (class 1259 OID 16399)
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16397)
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 198
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- TOC entry 197 (class 1259 OID 16388)
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16386)
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 196
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- TOC entry 243 (class 1259 OID 17144)
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16793)
-- Name: docente_area_docentearea_da_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.docente_area_docentearea_da_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.docente_area_docentearea_da_id_seq OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16774)
-- Name: docente_area_docentearea; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.docente_area_docentearea (
    da_id integer DEFAULT nextval('public.docente_area_docentearea_da_id_seq'::regclass) NOT NULL,
    da_area_id integer NOT NULL,
    da_docente_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.docente_area_docentearea OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16834)
-- Name: docente_horas_docentehoras_dh_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.docente_horas_docentehoras_dh_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.docente_horas_docentehoras_dh_id_seq OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 16815)
-- Name: docente_horas_docentehoras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.docente_horas_docentehoras (
    dh_id integer DEFAULT nextval('public.docente_horas_docentehoras_dh_id_seq'::regclass) NOT NULL,
    dh_horas_total integer NOT NULL,
    dh_docente_id integer NOT NULL,
    dh_planificacion_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    dh_horas_hor integer NOT NULL,
    dh_horas_planta integer NOT NULL
);


ALTER TABLE public.docente_horas_docentehoras OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16867)
-- Name: docentes_docente_docente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.docentes_docente_docente_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.docentes_docente_docente_id_seq OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16763)
-- Name: docentes_docente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.docentes_docente (
    docente_nombre character varying(50) NOT NULL,
    docente_id integer DEFAULT nextval('public.docentes_docente_docente_id_seq'::regclass) NOT NULL,
    docente_tipo_contrato character varying(50) NOT NULL,
    docente_inss character varying(50) NOT NULL,
    docente_departamento_id integer NOT NULL,
    docente_hname character varying(50) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.docentes_docente OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16907)
-- Name: facultades_facultad_facultad_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.facultades_facultad_facultad_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.facultades_facultad_facultad_id_seq OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16555)
-- Name: facultades_facultad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.facultades_facultad (
    facultad_nombre character varying(50) NOT NULL,
    facultad_id integer DEFAULT nextval('public.facultades_facultad_facultad_id_seq'::regclass) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.facultades_facultad OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16980)
-- Name: grupos_grupo_grupo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.grupos_grupo_grupo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.grupos_grupo_grupo_id_seq OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16953)
-- Name: grupos_grupo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grupos_grupo (
    grupo_id integer DEFAULT nextval('public.grupos_grupo_grupo_id_seq'::regclass) NOT NULL,
    grupo_numero integer NOT NULL,
    grupo_max_capacidad integer NOT NULL,
    grupo_tipo character varying(50) NOT NULL,
    grupo_horas_clase integer NOT NULL,
    grupo_modo character varying(50) NOT NULL,
    grupo_componente_id integer NOT NULL,
    grupo_docente_id integer,
    grupo_planificacion_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    grupo_planta boolean NOT NULL,
    grupo_asignado boolean NOT NULL
);


ALTER TABLE public.grupos_grupo OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 17056)
-- Name: horario_horario_horario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.horario_horario_horario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.horario_horario_horario_id_seq OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 17037)
-- Name: horario_horario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.horario_horario (
    horario_id integer DEFAULT nextval('public.horario_horario_horario_id_seq'::regclass) NOT NULL,
    horario_dia character varying(50) NOT NULL,
    horario_hora integer NOT NULL,
    horario_vacio boolean NOT NULL,
    horario_aula_id integer NOT NULL,
    horario_grupo_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.horario_horario OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 17095)
-- Name: plan_de_estudio_plandeestudio_pde_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plan_de_estudio_plandeestudio_pde_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plan_de_estudio_plandeestudio_pde_id_seq OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16681)
-- Name: plan_de_estudio_plandeestudio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_de_estudio_plandeestudio (
    pde_id integer DEFAULT nextval('public.plan_de_estudio_plandeestudio_pde_id_seq'::regclass) NOT NULL,
    pde_nombre character varying(50) NOT NULL,
    pde_anyo integer NOT NULL,
    pde_carrera_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.plan_de_estudio_plandeestudio OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16928)
-- Name: planificacion_planificacion_planificacion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.planificacion_planificacion_planificacion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planificacion_planificacion_planificacion_id_seq OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16810)
-- Name: planificacion_planificacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planificacion_planificacion (
    planificacion_id integer DEFAULT nextval('public.planificacion_planificacion_planificacion_id_seq'::regclass) NOT NULL,
    planificacion_anyo_lectivo integer NOT NULL,
    planificacion_semestre integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.planificacion_planificacion OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 17123)
-- Name: recintos_recinto_recinto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recintos_recinto_recinto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recintos_recinto_recinto_id_seq OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16560)
-- Name: recintos_recinto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recintos_recinto (
    recinto_nombre character varying(50) NOT NULL,
    recinto_id integer DEFAULT nextval('public.recintos_recinto_recinto_id_seq'::regclass) NOT NULL,
    recinto_ubicacion character varying(250) NOT NULL,
    recinto_facultad_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.recintos_recinto OWNER TO postgres;

--
-- TOC entry 3057 (class 2604 OID 16420)
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- TOC entry 3058 (class 2604 OID 16430)
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- TOC entry 3056 (class 2604 OID 16412)
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- TOC entry 3059 (class 2604 OID 16438)
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- TOC entry 3060 (class 2604 OID 16448)
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- TOC entry 3061 (class 2604 OID 16456)
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- TOC entry 3062 (class 2604 OID 16516)
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- TOC entry 3055 (class 2604 OID 16402)
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- TOC entry 3054 (class 2604 OID 16391)
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- TOC entry 3349 (class 0 OID 16535)
-- Dependencies: 214
-- Data for Name: area_area; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.area_area (area_id, area_nombre, created_at, updated_at) FROM stdin;
1	Programacion	2020-03-06 14:10:22.347886-06	2020-03-06 14:10:22.347912-06
15	Redes	2020-03-06 17:39:00.844744-06	2020-03-06 17:39:00.844782-06
16	Programacion Web	2020-03-06 17:39:28.011548-06	2020-03-06 17:39:28.011584-06
17	administracion	2020-03-06 17:39:48.499851-06	2020-03-06 17:39:48.499887-06
19	Informatica	2020-03-06 17:40:25.987878-06	2020-03-06 17:40:25.987917-06
20	Servicio	2020-03-06 17:42:38.163627-06	2020-03-06 17:42:38.163655-06
21	Hardware	2020-03-06 21:02:26.396296-06	2020-03-06 21:02:26.396339-06
22	Bases de Datos	2020-03-06 21:19:18.222336-06	2020-03-06 21:19:18.222399-06
23	Metodologia	2020-03-06 22:06:26.101622-06	2020-03-06 22:06:26.101649-06
\.


--
-- TOC entry 3353 (class 0 OID 16571)
-- Dependencies: 218
-- Data for Name: aulas_aula; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aulas_aula (aula_nombre, aula_id, aula_tipo, aula_capacidad, aula_recinto_id, created_at, updated_at) FROM stdin;
Hardware	1	t	40	1	2020-03-06 17:58:50.237119-06	2020-03-06 17:58:50.237146-06
C3	3	f	40	2	2020-03-06 18:00:05.297857-06	2020-03-06 18:00:05.297883-06
C2	4	f	40	2	2020-03-06 18:00:15.530389-06	2020-03-06 18:00:15.530421-06
C4	5	f	40	2	2020-03-06 18:00:21.785025-06	2020-03-06 18:00:21.78505-06
C5	6	f	40	2	2020-03-06 18:00:26.382753-06	2020-03-06 18:00:26.382778-06
C9	7	f	40	2	2020-03-06 18:00:30.897239-06	2020-03-06 18:00:30.897271-06
Lab Cisco	9	t	40	3	2020-03-06 19:32:00.028459-06	2020-03-06 19:32:00.028502-06
B4	11	f	40	4	2020-03-06 19:32:54.198991-06	2020-03-06 19:32:54.199016-06
B6	12	f	40	4	2020-03-06 19:32:57.544443-06	2020-03-06 19:32:57.544488-06
B2	13	f	40	4	2020-03-13 23:59:03.070358-06	2020-03-13 23:59:03.070385-06
Alcai La	14	t	40	5	2020-03-19 11:28:14.556541-06	2020-03-19 11:28:14.556584-06
A4	15	f	40	5	2020-03-19 11:28:20.357162-06	2020-03-19 11:28:20.357195-06
Lab 1	16	t	40	3	2020-03-19 19:08:45.968376-06	2020-03-19 19:08:45.968412-06
Lab Alcala II	8	t	40	2	2020-03-06 18:00:41.676105-06	2020-03-30 11:55:17.9842-06
Lab Alcala 1	2	t	40	1	2020-03-06 17:59:27.260538-06	2020-03-30 11:55:54.225806-06
\.


--
-- TOC entry 3338 (class 0 OID 16417)
-- Dependencies: 203
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- TOC entry 3340 (class 0 OID 16427)
-- Dependencies: 205
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- TOC entry 3336 (class 0 OID 16409)
-- Dependencies: 201
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add user	4	add_user
14	Can change user	4	change_user
15	Can delete user	4	delete_user
16	Can view user	4	view_user
17	Can add content type	5	add_contenttype
18	Can change content type	5	change_contenttype
19	Can delete content type	5	delete_contenttype
20	Can view content type	5	view_contenttype
21	Can add session	6	add_session
22	Can change session	6	change_session
23	Can delete session	6	delete_session
24	Can view session	6	view_session
25	Can add Facultad	7	add_facultad
26	Can change Facultad	7	change_facultad
27	Can delete Facultad	7	delete_facultad
28	Can view Facultad	7	view_facultad
29	Can add docente	8	add_docente
30	Can change docente	8	change_docente
31	Can delete docente	8	delete_docente
32	Can view docente	8	view_docente
33	Can add aula	9	add_aula
34	Can change aula	9	change_aula
35	Can delete aula	9	delete_aula
36	Can view aula	9	view_aula
37	Can add recinto	10	add_recinto
38	Can change recinto	10	change_recinto
39	Can delete recinto	10	delete_recinto
40	Can view recinto	10	view_recinto
41	Can add carrera	11	add_carrera
42	Can change carrera	11	change_carrera
43	Can delete carrera	11	delete_carrera
44	Can view carrera	11	view_carrera
45	Can add grupo	12	add_grupo
46	Can change grupo	12	change_grupo
47	Can delete grupo	12	delete_grupo
48	Can view grupo	12	view_grupo
49	Can add departamento	13	add_departamento
50	Can change departamento	13	change_departamento
51	Can delete departamento	13	delete_departamento
52	Can view departamento	13	view_departamento
53	Can add Plan de estudio	14	add_plandeestudio
54	Can change Plan de estudio	14	change_plandeestudio
55	Can delete Plan de estudio	14	delete_plandeestudio
56	Can view Plan de estudio	14	view_plandeestudio
57	Can add Area	15	add_area
58	Can change Area	15	change_area
59	Can delete Area	15	delete_area
60	Can view Area	15	view_area
61	Can add componente	16	add_componente
62	Can change componente	16	change_componente
63	Can delete componente	16	delete_componente
64	Can view componente	16	view_componente
65	Can add Docente Area	17	add_docentearea
66	Can change Docente Area	17	change_docentearea
67	Can delete Docente Area	17	delete_docentearea
68	Can view Docente Area	17	view_docentearea
69	Can add Planificacion	18	add_planificacion
70	Can change Planificacion	18	change_planificacion
71	Can delete Planificacion	18	delete_planificacion
72	Can view Planificacion	18	view_planificacion
73	Can add Docente Hora	19	add_docentehoras
74	Can change Docente Hora	19	change_docentehoras
75	Can delete Docente Hora	19	delete_docentehoras
76	Can view Docente Hora	19	view_docentehoras
77	Can add horario	20	add_horario
78	Can change horario	20	change_horario
79	Can delete horario	20	delete_horario
80	Can view horario	20	view_horario
81	Can add Token	21	add_token
82	Can change Token	21	change_token
83	Can delete Token	21	delete_token
84	Can view Token	21	view_token
\.


--
-- TOC entry 3342 (class 0 OID 16435)
-- Dependencies: 207
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$150000$OXD9JlGLqpjr$tJqijhwXMHn9tHKH4pA4cg0nlwslJVguPI6mXuwf4pc=	2020-04-27 19:15:59.833018-06	t	kenny			kennethsomarriba96@live.com	t	t	2020-03-05 02:30:14.485928-06
\.


--
-- TOC entry 3344 (class 0 OID 16445)
-- Dependencies: 209
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- TOC entry 3346 (class 0 OID 16453)
-- Dependencies: 211
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- TOC entry 3355 (class 0 OID 16613)
-- Dependencies: 220
-- Data for Name: authtoken_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.authtoken_token (key, created, user_id) FROM stdin;
\.


--
-- TOC entry 3357 (class 0 OID 16642)
-- Dependencies: 222
-- Data for Name: carreras_carrera; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carreras_carrera (carrera_nombre, carrera_id, carrera_departamento_id, created_at, updated_at, carrera_tipo) FROM stdin;
Ingenieria en telematica	1	1	2020-03-06 17:51:04.373342-06	2020-03-06 17:51:04.373367-06	P
Ingenieria en Sistemas de INformacion	2	1	2020-03-06 17:51:18.108566-06	2020-03-06 17:51:18.10859-06	P
UALN	3	1	2020-03-06 17:51:28.053323-06	2020-03-06 17:51:28.053349-06	P
Servicio	4	1	2020-03-06 17:51:34.94971-06	2020-03-06 17:51:34.94975-06	P
\.


--
-- TOC entry 3360 (class 0 OID 16692)
-- Dependencies: 225
-- Data for Name: componentes_componente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.componentes_componente (componente_nombre, componente_id, componente_chp, componente_cht, componente_ciclo, componente_area_id, componente_pde_id, created_at, updated_at, componente_credito) FROM stdin;
Calculo I	1	0	4	2	20	2	2020-03-06 20:44:28.375827-06	2020-03-06 20:44:28.375863-06	4
Electiva de Actividad Estudiantil II	3	0	2	2	20	2	2020-03-06 20:48:47.699726-06	2020-03-06 20:48:47.699753-06	1
Fundamentos de informatica	4	0	4	2	19	2	2020-03-06 20:51:43.645111-06	2020-03-06 20:51:43.645142-06	3
Laboratorio de Logica de Programacion	6	2	0	2	1	2	2020-03-06 20:53:58.028661-06	2020-03-06 20:53:58.028685-06	2
Aplicaciones y Estructuras de Datos	11	4	0	4	1	2	2020-03-06 21:01:04.572759-06	2020-03-06 21:01:04.572796-06	2
Circuitos Logicos	12	2	2	4	21	2	2020-03-06 21:02:42.696428-06	2020-03-06 21:02:42.696455-06	3
Infraestructura TIC II	19	4	0	6	15	2	2020-03-06 21:17:11.629703-06	2020-03-06 21:17:11.629739-06	2
Introduccion a la Estructuras de Bases de Datos	20	0	2	6	22	2	2020-03-06 21:19:25.267191-06	2020-03-06 21:19:25.267219-06	2
Ingles Aplicado III	15	0	2	4	20	2	2020-03-06 21:09:06.908585-06	2020-03-06 21:21:17.804428-06	2
Educacion Ambiental	2	0	4	2	20	2	2020-03-06 20:45:56.720793-06	2020-03-06 21:22:11.465701-06	3
Ingles Aplicado I	5	0	2	2	20	2	2020-03-06 20:52:32.820079-06	2020-03-06 21:22:26.490988-06	2
Logica de Programacion	7	0	4	2	1	2	2020-03-06 20:54:51.449247-06	2020-03-06 21:22:43.030146-06	4
Ofimatica Aplicada	8	2	0	2	19	2	2020-03-06 20:55:47.980013-06	2020-03-06 21:22:58.636477-06	2
Algebra Lineal	9	0	4	4	20	2	2020-03-06 20:56:47.871811-06	2020-03-06 21:23:18.71405-06	3
Algoritmos y Estructuras de Datos	10	0	4	4	1	2	2020-03-06 21:00:14.382136-06	2020-03-06 21:23:29.747643-06	3
Electiva FEI: Diseño de Paginas WEB	13	4	0	4	16	2	2020-03-06 21:05:26.172154-06	2020-03-06 21:23:54.711999-06	3
Electiva FEI: Topicos Avanzados de Ofimatica	14	4	0	4	19	2	2020-03-06 21:06:33.902434-06	2020-03-06 21:23:59.649555-06	3
Electiva III: Contabilidad de Costo I	17	0	4	6	20	2	2020-03-06 21:13:42.264695-06	2020-03-06 21:26:27.294961-06	4
Electiva III: Estadistica Introductoria	18	0	4	6	20	2	2020-03-06 21:15:17.076727-06	2020-03-06 21:26:33.726274-06	4
Programacion Visual I	22	4	2	6	1	2	2020-03-06 21:36:08.232534-06	2020-03-06 21:36:08.232561-06	4
Sistemas Gestores de Bases de Datos II	23	4	0	6	22	2	2020-03-06 21:40:11.423736-06	2020-03-06 21:40:11.423764-06	3
Sistemas Operativos	24	2	4	6	17	2	2020-03-06 21:40:52.942803-06	2020-03-06 21:40:52.942829-06	4
Administracion de Servicios en Redes I	25	2	2	8	15	2	2020-03-06 21:42:40.553487-06	2020-03-06 21:42:40.553515-06	3
Analisis y Diseño de Sistemas de Informacion	26	2	2	8	17	2	2020-03-06 21:45:25.791036-06	2020-03-06 21:45:25.791062-06	3
Electiva VI: Direccion de RRHH	27	0	4	8	20	2	2020-03-06 21:47:05.212484-06	2020-03-06 21:47:05.212525-06	3
Electiva VI: Mercadotecnia I	28	0	4	8	20	2	2020-03-06 21:48:33.485595-06	2020-03-06 21:48:58.903054-06	3
Electiva VII: Calculo de Probabilidad	29	0	4	8	20	2	2020-03-06 21:50:03.33637-06	2020-03-06 21:50:03.336397-06	4
Electiva VII: Procesos Aleatorios	30	0	4	8	20	2	2020-03-06 22:00:19.244139-06	2020-03-06 22:00:19.244165-06	4
Formulacion de Proyectos	31	0	2	8	23	2	2020-03-06 22:06:36.088586-06	2020-03-06 22:06:36.088622-06	2
Programacion Orientada a la Web II	32	2	2	8	16	2	2020-03-06 22:15:55.96697-06	2020-03-06 22:15:55.967011-06	3
Sistemas de Informacion Geografica	33	4	0	8	17	2	2020-03-06 22:32:46.334027-06	2020-03-06 22:32:46.334079-06	3
Electiva IX: Introduccion a los CMS	34	4	0	10	17	2	2020-03-06 22:35:58.563245-06	2020-03-06 22:35:58.563285-06	3
Electiva IX: Validacion de aplicaciones bajo filosofia OWASP	35	4	0	10	1	2	2020-03-06 22:40:05.769734-06	2020-03-06 22:40:05.769761-06	3
Practicas Profesionales	37	0	4	10	23	2	2020-03-06 22:51:29.225528-06	2020-03-06 22:51:29.225554-06	10
Proyecto Integrador II	38	0	2	10	23	2	2020-03-06 22:52:27.466743-06	2020-03-06 22:52:27.466769-06	2
Educacion Ambiental	40	0	4	2	20	1	2020-03-06 23:08:42.230987-06	2020-03-06 23:08:42.231014-06	3
Calculo I	39	0	4	2	20	1	2020-03-06 22:59:35.442616-06	2020-03-07 23:21:47.360521-06	4
Fundamentos de Informatica	42	0	4	2	19	1	2020-03-06 23:22:54.23886-06	2020-03-07 23:21:57.213519-06	3
Laboratorio de Logica de Programacion	44	2	0	2	1	1	2020-03-07 23:25:41.940369-06	2020-03-07 23:25:41.940396-06	2
Ingles Aplicado I	43	0	2	2	20	1	2020-03-07 23:24:49.36035-06	2020-03-07 23:26:02.936289-06	2
ofimatica Aplicada	46	2	0	2	19	1	2020-03-07 23:29:20.791438-06	2020-03-07 23:29:20.79148-06	2
Algebra Lineal	47	0	4	4	20	1	2020-03-07 23:30:51.332119-06	2020-03-07 23:30:51.332158-06	3
Algoritmos y Estructuras de Datos	48	0	4	4	1	1	2020-03-07 23:31:43.414928-06	2020-03-07 23:31:43.414956-06	3
Aplicaciones de Estructuras de Datos	49	4	0	4	1	1	2020-03-07 23:32:52.716489-06	2020-03-07 23:32:52.716515-06	2
Circuitos Logicos	50	2	2	4	21	1	2020-03-07 23:34:50.66789-06	2020-03-07 23:34:50.667916-06	3
Electiva FEI: Diseño de Paginas Web	51	4	0	4	16	1	2020-03-07 23:37:58.82048-06	2020-03-07 23:37:58.82052-06	3
Electiva FEI: Topicos avanzados de Ofimatica	52	4	0	4	19	1	2020-03-07 23:41:43.987258-06	2020-03-07 23:41:43.987295-06	3
Ingles Aplicado III	53	0	2	4	20	1	2020-03-07 23:43:06.842688-06	2020-03-07 23:43:06.842717-06	2
Electiva III: Contabilidad de Costo I	55	0	4	6	20	1	2020-03-07 23:54:25.703734-06	2020-03-07 23:54:25.70377-06	4
Electiva III: Estadistica Introductoria	56	0	4	6	20	1	2020-03-07 23:55:00.475142-06	2020-03-07 23:55:00.475188-06	4
Medios de Transmision de Datos	58	2	0	6	15	1	2020-03-08 00:16:40.59533-06	2020-03-08 00:16:40.595375-06	2
Programacion Visual	59	4	2	6	1	1	2020-03-08 00:17:22.332665-06	2020-03-08 00:17:22.332705-06	4
Electiva de Actividad estudiantil II	41	0	2	2	20	1	2020-03-06 23:20:16.506033-06	2020-03-08 12:11:20.396401-06	1
Investigacion I	54	0	2	4	23	1	2020-03-07 23:43:38.763972-06	2020-03-08 21:09:13.761248-06	2
Investigacion II	57	0	2	6	23	1	2020-03-07 23:55:25.300374-06	2020-03-08 22:50:34.043501-06	2
Investigacion I	16	0	2	4	23	2	2020-03-06 21:10:58.521582-06	2020-03-12 17:11:32.754992-06	2
Patrones de Diseño	36	0	4	10	16	2	2020-03-06 22:50:47.310101-06	2020-03-12 17:48:10.78414-06	3
Investigacion II	21	0	2	6	20	2	2020-03-06 21:35:14.831994-06	2020-04-08 19:12:56.069433-06	2
Sistemas Telematicos	60	2	4	6	17	1	2020-03-08 00:18:03.579111-06	2020-03-08 00:18:03.579147-06	4
Tecnologias de Nivel Fisico	61	0	4	6	15	1	2020-03-08 00:20:47.977169-06	2020-03-08 00:20:47.977195-06	3
Electiva VI: Comercio Electronico	62	2	2	8	16	1	2020-03-08 00:21:40.504465-06	2020-03-08 00:21:40.504509-06	3
Electiva VI: Edicion de Video	63	2	2	8	19	1	2020-03-08 00:22:31.184517-06	2020-03-08 00:22:31.184546-06	3
Electiva VII: Calculo de Probabilidad	64	0	4	8	20	1	2020-03-08 00:27:00.547911-06	2020-03-08 00:27:00.547947-06	3
Electiva VII: Procesos Aleatorios	65	0	4	8	20	1	2020-03-08 00:27:47.459251-06	2020-03-08 00:27:47.459277-06	3
Gestion de Sistemas Unix	67	4	0	8	17	1	2020-03-08 00:39:08.81852-06	2020-03-08 00:39:08.818561-06	3
Optativa III	68	0	0	8	20	1	2020-03-08 00:40:45.871128-06	2020-03-08 00:40:45.871155-06	2
Redes de Computadores	69	2	2	8	15	1	2020-03-08 00:41:45.738686-06	2020-03-08 00:41:54.621377-06	3
Software como Un servicio	70	2	2	8	16	1	2020-03-08 00:43:42.889033-06	2020-03-08 00:43:42.889068-06	3
Electiva X: Administracion de Servidores	71	2	2	10	17	1	2020-03-08 07:04:42.294413-06	2020-03-08 07:04:42.294451-06	3
Electiva X: Despliegue de IPv6	72	2	2	10	15	1	2020-03-08 07:05:16.566961-06	2020-03-08 07:05:16.566988-06	3
Practicas Peofesionales	73	0	4	10	15	1	2020-03-08 07:07:31.527438-06	2020-03-08 07:07:31.527464-06	10
Seminario Monografico	74	2	0	10	23	1	2020-03-08 07:09:47.743726-06	2020-03-08 07:09:47.743752-06	2
Framework para Diseño	75	2	0	3	16	3	2020-03-08 07:21:53.713412-06	2020-03-08 07:21:53.713436-06	1
Programacion Estructurada II	76	2	0	3	1	3	2020-03-08 07:23:06.193109-06	2020-03-08 07:23:06.193147-06	1
Emprendimiento y Liderazgo Avanzado I	77	2	0	6	23	3	2020-03-08 07:26:05.876077-06	2020-03-08 07:26:05.876107-06	1
Investigacion II	78	2	0	6	23	3	2020-03-08 07:26:36.124075-06	2020-03-08 07:26:36.124101-06	1
Principios de Programacion Orientada a Objetos	79	0	4	6	1	3	2020-03-08 07:27:34.288803-06	2020-03-08 07:27:34.288844-06	1
Introduccion a los Servicios de Internet en la Nube	80	4	0	2	17	4	2020-03-08 07:31:23.006401-06	2020-03-08 07:31:23.006425-06	1
Informatica I v	81	2	0	2	19	4	2020-03-08 07:33:28.255893-06	2020-03-08 07:33:28.255917-06	1
Informatica I p	82	2	0	2	19	4	2020-03-08 07:33:49.108688-06	2020-03-08 07:33:49.10873-06	1
Computacion I	83	2	0	2	19	4	2020-03-08 07:34:31.510892-06	2020-03-08 07:34:31.510944-06	1
Ofimatica	84	2	0	2	19	4	2020-03-08 07:34:56.007814-06	2020-03-08 07:34:56.007852-06	1
Logica de Programacion	85	0	4	2	1	1	2020-03-08 12:43:23.996455-06	2020-03-08 12:43:23.996506-06	4
Formulacion de Proyectos	66	0	2	8	23	1	2020-03-08 00:36:55.129152-06	2020-03-08 23:11:00.748061-06	2
Actividad Estudiantil I	86	0	2	1	20	1	2020-03-11 08:13:03.985376-06	2020-03-11 08:13:03.985434-06	1
Comunicacion y Leguaje	88	0	4	1	20	1	2020-03-11 08:14:16.654907-06	2020-03-11 08:14:16.654934-06	4
Filosofia	89	0	4	1	20	1	2020-03-11 08:14:38.87374-06	2020-03-11 08:14:38.873779-06	3
Historia de Nicaragua	90	0	4	1	20	1	2020-03-11 08:15:02.779756-06	2020-03-11 08:15:02.779782-06	3
Ingles	91	0	2	1	20	1	2020-03-11 08:16:08.852196-06	2020-03-11 08:16:08.852238-06	2
Matematica Basica	92	0	4	1	20	1	2020-03-11 08:17:00.078356-06	2020-03-11 08:17:00.078382-06	4
Biologia General	87	2	4	1	20	1	2020-03-11 08:13:42.690971-06	2020-03-11 08:17:23.32064-06	4
Calculo II	93	0	4	3	20	1	2020-03-11 08:18:38.908961-06	2020-03-11 08:18:38.90899-06	4
Fisica	94	2	4	3	20	1	2020-03-11 08:19:11.747241-06	2020-03-11 08:19:11.747269-06	4
Ingles Aplicado II	95	0	2	3	20	1	2020-03-11 08:19:56.007372-06	2020-03-11 08:19:56.007411-06	2
laboratorio de Programacion Estructurada	96	2	0	3	1	1	2020-03-11 08:20:48.337809-06	2020-03-11 08:20:48.337836-06	2
Matematica Discreta	97	0	4	3	20	1	2020-03-11 08:21:15.298633-06	2020-03-11 08:21:15.298659-06	4
Programacion Estructurada	98	0	4	3	1	1	2020-03-11 08:21:44.380453-06	2020-03-11 08:21:44.380488-06	4
Optativa I	99	0	4	3	20	1	2020-03-11 08:22:28.66893-06	2020-03-11 08:22:28.668966-06	2
Diseno de Bases de Datos	101	0	4	5	22	1	2020-03-11 08:24:03.585928-06	2020-03-11 08:24:03.585956-06	3
Electiva de Actividad Estudiantil III	102	0	2	5	20	1	2020-03-11 08:24:44.440283-06	2020-03-11 08:24:44.440312-06	1
Programacion Orientada a Objetos	103	2	4	5	1	1	2020-03-11 08:25:45.757873-06	2020-03-11 08:25:45.757912-06	4
Sistemas Gestores de Bases de Datos I	104	2	0	5	22	1	2020-03-11 08:27:27.688532-06	2020-03-11 08:27:27.68856-06	3
Electiva II: Administracion General	105	0	4	5	20	1	2020-03-12 12:45:38.933434-06	2020-03-12 12:45:38.933496-06	4
Electiva II: Contabilidad Financiera I	106	0	4	5	20	1	2020-03-12 12:46:09.51191-06	2020-03-12 12:46:09.511936-06	4
Comunicacion de Datos	107	2	2	7	15	1	2020-03-12 12:59:04.740961-06	2020-03-12 12:59:04.740991-06	3
Programacion de Sistemas Distribuidos Unix	108	2	0	7	1	1	2020-03-12 13:00:28.673761-06	2020-03-12 13:00:37.86283-06	2
Programacion Orientada a la Web	109	2	2	7	16	1	2020-03-12 13:03:58.587701-06	2020-03-12 13:03:58.587726-06	3
Sistemas distibuidos	110	0	4	7	1	1	2020-03-12 13:04:43.325568-06	2020-03-12 13:04:43.325593-06	3
Electiva IV: Reparacion y Mantenimiento de Computadores	111	2	2	7	21	1	2020-03-12 13:06:25.803062-06	2020-03-12 13:06:25.803087-06	3
Electiva IV: Tratamiento de Imagenes Digitales	112	2	2	7	19	1	2020-03-12 13:14:01.610557-06	2020-03-12 13:14:01.610585-06	3
Electiva V: Infraestructura TIC	113	2	0	7	21	1	2020-03-12 13:16:25.445873-06	2020-03-12 13:16:25.445899-06	2
Electiva V: Redaccion y Comunicacion Cientifica	114	0	0	7	19	1	2020-03-12 13:17:17.218748-06	2020-03-12 13:17:17.218782-06	2
Optativa II	115	0	0	7	20	1	2020-03-12 13:18:14.780619-06	2020-03-12 13:18:14.780656-06	2
Administracion de Servicios en Red	116	4	2	9	17	1	2020-03-12 13:22:13.309765-06	2020-03-12 13:22:13.309802-06	4
Gestion de Red	117	2	2	9	15	1	2020-03-12 13:51:31.393449-06	2020-03-12 13:51:31.393476-06	3
Investigacion III	118	0	2	9	23	1	2020-03-12 13:52:24.311896-06	2020-03-12 13:52:24.311937-06	2
Seguridad de Redes	119	2	2	9	15	1	2020-03-12 13:53:10.815754-06	2020-03-12 13:53:10.815781-06	3
Electiva VIII: Computacion en la Nube	120	0	4	9	17	1	2020-03-12 13:55:54.909178-06	2020-03-12 13:55:54.909218-06	3
Electiva III: Programacion en Android	121	4	0	9	1	1	2020-03-12 13:56:49.368953-06	2020-03-12 13:56:49.36898-06	3
Electiva IX: Redes de Area Extensa	122	2	2	9	15	1	2020-03-12 13:57:41.926091-06	2020-03-12 13:57:41.926136-06	3
ELECTIVA IX: TECNOLOGIA DE REDES CELULARES	123	0	0	9	15	1	2020-03-12 14:02:50.692033-06	2020-03-12 14:02:50.692075-06	3
Calculo II	124	0	4	3	20	2	2020-03-12 14:14:16.199649-06	2020-03-12 14:14:16.199682-06	4
Fisica	125	2	4	3	20	2	2020-03-12 14:14:41.103405-06	2020-03-12 14:14:41.103444-06	4
Ingles Aplicado II	126	0	2	3	20	2	2020-03-12 14:15:08.039362-06	2020-03-12 14:15:08.039401-06	2
Laboratorio de Programacion Estructurada	127	2	0	3	1	2	2020-03-12 14:17:22.942406-06	2020-03-12 14:17:22.942432-06	2
Matematica Discreta	128	0	4	3	20	2	2020-03-12 14:17:44.709165-06	2020-03-12 14:17:44.709196-06	4
Programacion Estructurada	129	0	4	3	1	2	2020-03-12 14:18:11.493062-06	2020-03-12 14:18:11.493096-06	4
Optativa I	130	0	0	3	20	2	2020-03-12 14:21:14.030283-06	2020-03-12 14:21:14.030322-06	2
Arquitectura de Computadores	131	2	2	5	21	2	2020-03-12 14:22:38.848752-06	2020-03-12 14:22:38.848778-06	3
Diseño de Bases de Datos	132	0	4	5	22	2	2020-03-12 14:24:34.185546-06	2020-03-12 14:24:34.185585-06	3
Electiva de Actividad Estudiantil III	133	0	2	5	20	2	2020-03-12 14:25:02.797139-06	2020-03-12 14:25:02.797164-06	1
Programacion Orientada a Objetos	135	4	2	5	1	2	2020-03-12 14:27:08.168744-06	2020-03-12 14:27:08.168782-06	4
Arquitectura de Computadores	100	2	2	5	21	1	2020-03-11 08:23:13.413175-06	2020-03-12 19:34:38.302401-06	3
Electiva II: Contabilidad Financiera I	137	0	4	5	20	2	2020-03-12 14:37:29.047712-06	2020-03-12 14:37:29.047752-06	4
Administracion de Sistemas Operativos	138	2	2	7	17	2	2020-03-12 14:39:21.528729-06	2020-03-12 14:39:21.528755-06	3
Diseño de Redes	139	2	2	7	15	2	2020-03-12 14:43:29.821024-06	2020-03-12 14:43:29.821062-06	3
Programacion Orientada a la Web I	140	2	2	7	16	2	2020-03-12 14:44:34.17965-06	2020-03-12 14:44:34.179692-06	3
Programacion Visual II	141	2	2	7	1	2	2020-03-12 14:45:08.007804-06	2020-03-12 14:45:08.007842-06	3
Electiva IV: Reparacion y Mantenimiento de Computadores	142	2	2	7	21	2	2020-03-12 14:49:01.524724-06	2020-03-12 14:49:01.52475-06	3
Electiva V: Robotica Educativa	143	4	0	7	21	2	2020-03-12 14:49:41.812224-06	2020-03-12 14:49:41.812312-06	3
Optativa II	144	0	2	7	20	2	2020-03-12 14:52:36.766852-06	2020-03-12 14:52:36.766879-06	2
Administracion de Servicios de Redes II	145	2	2	9	17	2	2020-03-12 14:53:23.341728-06	2020-03-12 14:53:23.341753-06	3
Ingenieria del Software	146	2	2	9	19	2	2020-03-12 14:54:07.889936-06	2020-03-12 14:54:07.889961-06	3
Introduccion a la Seguridad en Redes	147	2	2	9	15	2	2020-03-12 14:54:51.20777-06	2020-03-12 14:54:51.20781-06	3
Proyecto Integrador I	148	0	4	9	23	2	2020-03-12 15:01:57.68095-06	2020-03-12 15:01:57.680976-06	3
Electiva VIII: Programacion en Android	149	4	0	9	1	2	2020-03-12 15:03:10.054305-06	2020-03-12 15:03:10.054343-06	3
Optativa III	150	0	2	9	20	2	2020-03-12 15:03:42.971949-06	2020-03-12 15:03:42.971976-06	3
Infraestructura TIC I	134	4	0	5	21	2	2020-03-12 14:25:56.036779-06	2020-03-12 19:15:05.812293-06	2
Sistemas Gestores de Bases de Datos I	136	4	0	5	22	2	2020-03-12 14:34:04.163919-06	2020-03-12 19:17:37.018228-06	3
\.


--
-- TOC entry 3356 (class 0 OID 16631)
-- Dependencies: 221
-- Data for Name: departamento_departamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departamento_departamento (departamento_nombre, departamento_id, departamento_facultad_id, created_at, updated_at) FROM stdin;
Computacion	1	1	2020-03-06 17:50:45.860704-06	2020-03-06 17:50:45.860727-06
\.


--
-- TOC entry 3348 (class 0 OID 16513)
-- Dependencies: 213
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2020-03-06 14:35:29.428181-06	14	Programacion	3		15	1
2	2020-03-06 14:35:29.631794-06	13	Programacion	3		15	1
3	2020-03-06 14:35:29.653858-06	12	Programacion	3		15	1
4	2020-03-06 14:35:29.6649-06	11	Programacion	3		15	1
5	2020-03-06 14:35:29.676119-06	10	Programacion	3		15	1
6	2020-03-06 14:35:29.687212-06	9	Programacion	3		15	1
7	2020-03-06 14:35:29.69823-06	8	Programacion	3		15	1
8	2020-03-06 14:35:29.709363-06	7	Programacion	3		15	1
9	2020-03-06 14:35:29.720484-06	6	Programacion	3		15	1
10	2020-03-06 14:35:29.73175-06	5	Programacion	3		15	1
11	2020-03-06 14:35:29.742896-06	4	Programacion	3		15	1
12	2020-03-06 14:35:29.75404-06	3	Programacion	3		15	1
13	2020-03-06 14:35:29.765092-06	2	Programacion	3		15	1
14	2020-03-06 14:35:29.776189-06	1	Programacion	3		15	1
15	2020-03-06 14:36:09.183778-06	14	Programacion	3		15	1
16	2020-03-06 14:36:09.20202-06	13	Programacion	3		15	1
17	2020-03-06 14:36:09.213157-06	12	Programacion	3		15	1
18	2020-03-06 14:36:09.224191-06	11	Programacion	3		15	1
19	2020-03-06 14:36:09.235488-06	10	Programacion	3		15	1
20	2020-03-06 14:36:09.24659-06	9	Programacion	3		15	1
21	2020-03-06 14:36:09.257586-06	8	Programacion	3		15	1
22	2020-03-06 14:36:09.268799-06	7	Programacion	3		15	1
23	2020-03-06 14:36:09.2799-06	6	Programacion	3		15	1
24	2020-03-06 14:36:09.290959-06	5	Programacion	3		15	1
25	2020-03-06 14:36:09.302241-06	4	Programacion	3		15	1
26	2020-03-06 14:36:09.313315-06	3	Programacion	3		15	1
27	2020-03-06 14:36:09.324392-06	2	Programacion	3		15	1
28	2020-03-06 14:36:09.335546-06	1	Programacion	3		15	1
29	2020-03-06 14:36:26.130834-06	1	Programacion	3		15	1
30	2020-03-08 12:54:42.605322-06	104	104 Valeria Medina	1	[{"added": {}}]	17	1
31	2020-03-30 11:23:52.048707-06	401	Jorge Arguello-B2 Jueves 7	3		20	1
32	2020-03-30 11:23:52.27628-06	396	Jorge Arguello-B2 Lunes 7	3		20	1
33	2020-03-30 11:23:52.318776-06	394	ATM-C9 Miercoles 13	3		20	1
34	2020-03-30 11:23:52.381259-06	393	ATM-C3 Martes 11	3		20	1
35	2020-03-30 11:23:52.430279-06	392	CIDS-Hardware Lunes 9	3		20	1
36	2020-03-30 11:23:52.496767-06	391	Jorge Arguello-B6 Martes 13	3		20	1
37	2020-03-30 11:23:52.541408-06	390	Jorge Arguello-B2 Viernes 17	3		20	1
38	2020-03-30 11:23:52.585414-06	389	Jorge Arguello-B2 Viernes 15	3		20	1
39	2020-03-30 11:23:52.641378-06	388	Jorge Arguello-B2 Viernes 13	3		20	1
40	2020-03-30 11:23:52.68596-06	387	Jorge Arguello-B2 Viernes 11	3		20	1
41	2020-03-30 11:23:52.696684-06	386	Jorge Arguello-B2 Viernes 9	3		20	1
42	2020-03-30 11:23:52.708089-06	384	Jorge Arguello-B2 Jueves 17	3		20	1
43	2020-03-30 11:23:52.718971-06	383	Jorge Arguello-B2 Jueves 15	3		20	1
44	2020-03-30 11:23:52.729994-06	382	Jorge Arguello-B2 Jueves 13	3		20	1
45	2020-03-30 11:23:52.741468-06	381	Jorge Arguello-B2 Jueves 11	3		20	1
46	2020-03-30 11:23:52.75214-06	380	Jorge Arguello-B2 Jueves 9	3		20	1
47	2020-03-30 11:23:52.763422-06	378	Jorge Arguello-B2 Miercoles 17	3		20	1
48	2020-03-30 11:23:52.774774-06	377	Jorge Arguello-B2 Miercoles 15	3		20	1
49	2020-03-30 11:23:52.785741-06	376	Jorge Arguello-B2 Miercoles 13	3		20	1
50	2020-03-30 11:23:52.796498-06	375	Jorge Arguello-B2 Miercoles 11	3		20	1
51	2020-03-30 11:23:52.807678-06	374	Jorge Arguello-B2 Miercoles 9	3		20	1
52	2020-03-30 11:23:52.818756-06	372	Jorge Arguello-B2 Martes 17	3		20	1
53	2020-03-30 11:23:52.830148-06	371	Jorge Arguello-B2 Martes 15	3		20	1
54	2020-03-30 11:23:52.841968-06	369	Jorge Arguello-B2 Martes 11	3		20	1
55	2020-03-30 11:23:52.852529-06	368	Jorge Arguello-B2 Martes 9	3		20	1
56	2020-03-30 11:23:52.863358-06	366	Jorge Arguello-B2 Lunes 17	3		20	1
57	2020-03-30 11:23:52.874753-06	365	Jorge Arguello-B2 Lunes 15	3		20	1
58	2020-03-30 11:23:52.886015-06	364	Jorge Arguello-B2 Lunes 13	3		20	1
59	2020-03-30 11:23:52.896782-06	363	Jorge Arguello-B2 Lunes 11	3		20	1
60	2020-03-30 11:23:52.907934-06	362	Jorge Arguello-B2 Lunes 9	3		20	1
61	2020-03-30 11:23:52.919416-06	360	Jorge Arguello-B6 Viernes 17	3		20	1
62	2020-03-30 11:23:52.930144-06	359	Jorge Arguello-B6 Viernes 15	3		20	1
63	2020-03-30 11:23:52.941266-06	358	Jorge Arguello-B6 Viernes 13	3		20	1
64	2020-03-30 11:23:52.952841-06	357	Jorge Arguello-B6 Viernes 11	3		20	1
65	2020-03-30 11:23:52.963448-06	356	Jorge Arguello-B6 Viernes 9	3		20	1
66	2020-03-30 11:23:52.974874-06	355	Jorge Arguello-B6 Viernes 7	3		20	1
67	2020-03-30 11:23:52.985451-06	354	Jorge Arguello-B6 Jueves 17	3		20	1
68	2020-03-30 11:23:52.996693-06	353	Jorge Arguello-B6 Jueves 15	3		20	1
69	2020-03-30 11:23:53.007778-06	352	Jorge Arguello-B6 Jueves 13	3		20	1
70	2020-03-30 11:23:53.018987-06	351	Jorge Arguello-B6 Jueves 11	3		20	1
71	2020-03-30 11:23:53.029953-06	350	Jorge Arguello-B6 Jueves 9	3		20	1
72	2020-03-30 11:23:53.041116-06	349	Jorge Arguello-B6 Jueves 7	3		20	1
73	2020-03-30 11:23:53.052123-06	348	Jorge Arguello-B6 Miercoles 17	3		20	1
74	2020-03-30 11:23:53.063425-06	347	Jorge Arguello-B6 Miercoles 15	3		20	1
75	2020-03-30 11:23:53.074766-06	346	Jorge Arguello-B6 Miercoles 13	3		20	1
76	2020-03-30 11:23:53.086815-06	345	Jorge Arguello-B6 Miercoles 11	3		20	1
77	2020-03-30 11:23:53.096907-06	344	Jorge Arguello-B6 Miercoles 9	3		20	1
78	2020-03-30 11:23:53.107887-06	343	Jorge Arguello-B6 Miercoles 7	3		20	1
79	2020-03-30 11:23:53.119135-06	342	Jorge Arguello-B6 Martes 17	3		20	1
80	2020-03-30 11:23:53.130347-06	341	Jorge Arguello-B6 Martes 15	3		20	1
81	2020-03-30 11:23:53.141309-06	339	Jorge Arguello-B6 Martes 11	3		20	1
82	2020-03-30 11:23:53.152314-06	338	Jorge Arguello-B6 Martes 9	3		20	1
83	2020-03-30 11:23:53.163581-06	337	Jorge Arguello-B6 Martes 7	3		20	1
84	2020-03-30 11:23:53.174664-06	336	Jorge Arguello-B6 Lunes 17	3		20	1
85	2020-03-30 11:23:53.186542-06	335	Jorge Arguello-B6 Lunes 15	3		20	1
86	2020-03-30 11:23:53.196804-06	334	Jorge Arguello-B6 Lunes 13	3		20	1
87	2020-03-30 11:23:53.207871-06	333	Jorge Arguello-B6 Lunes 11	3		20	1
88	2020-03-30 11:23:53.219013-06	332	Jorge Arguello-B6 Lunes 9	3		20	1
89	2020-03-30 11:23:53.230188-06	331	Jorge Arguello-B6 Lunes 7	3		20	1
90	2020-03-30 11:23:53.24145-06	330	Jorge Arguello-B4 Viernes 17	3		20	1
91	2020-03-30 11:23:53.253071-06	329	Jorge Arguello-B4 Viernes 15	3		20	1
92	2020-03-30 11:23:53.263628-06	328	Jorge Arguello-B4 Viernes 13	3		20	1
93	2020-03-30 11:23:53.274634-06	327	Jorge Arguello-B4 Viernes 11	3		20	1
94	2020-03-30 11:23:53.285881-06	326	Jorge Arguello-B4 Viernes 9	3		20	1
95	2020-03-30 11:23:53.297002-06	325	Jorge Arguello-B4 Viernes 7	3		20	1
96	2020-03-30 11:23:53.308544-06	324	Jorge Arguello-B4 Jueves 17	3		20	1
97	2020-03-30 11:23:53.319381-06	323	Jorge Arguello-B4 Jueves 15	3		20	1
98	2020-03-30 11:23:53.330292-06	322	Jorge Arguello-B4 Jueves 13	3		20	1
99	2020-03-30 11:23:53.341337-06	321	Jorge Arguello-B4 Jueves 11	3		20	1
100	2020-03-30 11:23:53.352362-06	320	Jorge Arguello-B4 Jueves 9	3		20	1
101	2020-03-30 11:23:53.363326-06	319	Jorge Arguello-B4 Jueves 7	3		20	1
102	2020-03-30 11:23:53.374307-06	318	Jorge Arguello-B4 Miercoles 17	3		20	1
103	2020-03-30 11:23:53.385541-06	317	Jorge Arguello-B4 Miercoles 15	3		20	1
104	2020-03-30 11:23:53.396667-06	316	Jorge Arguello-B4 Miercoles 13	3		20	1
105	2020-03-30 11:23:53.407869-06	315	Jorge Arguello-B4 Miercoles 11	3		20	1
106	2020-03-30 11:23:53.418838-06	314	Jorge Arguello-B4 Miercoles 9	3		20	1
107	2020-03-30 11:23:53.430083-06	313	Jorge Arguello-B4 Miercoles 7	3		20	1
108	2020-03-30 11:23:53.441315-06	312	Jorge Arguello-B4 Martes 17	3		20	1
109	2020-03-30 11:23:53.452712-06	311	Jorge Arguello-B4 Martes 15	3		20	1
110	2020-03-30 11:23:53.463729-06	310	Jorge Arguello-B4 Martes 13	3		20	1
111	2020-03-30 11:23:53.47475-06	309	Jorge Arguello-B4 Martes 11	3		20	1
112	2020-03-30 11:23:53.48603-06	308	Jorge Arguello-B4 Martes 9	3		20	1
113	2020-03-30 11:23:53.497076-06	307	Jorge Arguello-B4 Martes 7	3		20	1
114	2020-03-30 11:23:53.508181-06	306	Jorge Arguello-B4 Lunes 17	3		20	1
115	2020-03-30 11:23:53.519385-06	305	Jorge Arguello-B4 Lunes 15	3		20	1
116	2020-03-30 11:23:53.530284-06	304	Jorge Arguello-B4 Lunes 13	3		20	1
117	2020-03-30 11:23:53.541494-06	303	Jorge Arguello-B4 Lunes 11	3		20	1
118	2020-03-30 11:23:53.552582-06	302	Jorge Arguello-B4 Lunes 9	3		20	1
119	2020-03-30 11:23:53.563736-06	301	Jorge Arguello-B4 Lunes 7	3		20	1
120	2020-03-30 11:23:53.574822-06	270	Basico-Lab Cisco Viernes 17	3		20	1
121	2020-03-30 11:23:53.585918-06	269	Basico-Lab Cisco Viernes 15	3		20	1
122	2020-03-30 11:23:53.597034-06	268	Basico-Lab Cisco Viernes 13	3		20	1
123	2020-03-30 11:23:53.608074-06	267	Basico-Lab Cisco Viernes 11	3		20	1
124	2020-03-30 11:23:53.619307-06	266	Basico-Lab Cisco Viernes 9	3		20	1
125	2020-03-30 11:23:53.65282-06	265	Basico-Lab Cisco Viernes 7	3		20	1
126	2020-03-30 11:23:53.66405-06	264	Basico-Lab Cisco Jueves 17	3		20	1
127	2020-03-30 11:23:53.674853-06	263	Basico-Lab Cisco Jueves 15	3		20	1
128	2020-03-30 11:23:53.68598-06	262	Basico-Lab Cisco Jueves 13	3		20	1
129	2020-03-30 11:23:53.696798-06	261	Basico-Lab Cisco Jueves 11	3		20	1
130	2020-03-30 11:23:53.708052-06	260	Basico-Lab Cisco Jueves 9	3		20	1
131	2020-03-30 11:24:06.051352-06	259	Basico-Lab Cisco Jueves 7	3		20	1
132	2020-03-30 11:24:06.073218-06	258	Basico-Lab Cisco Miercoles 17	3		20	1
133	2020-03-30 11:24:06.08437-06	257	Basico-Lab Cisco Miercoles 15	3		20	1
134	2020-03-30 11:24:06.095719-06	256	Basico-Lab Cisco Miercoles 13	3		20	1
135	2020-03-30 11:24:06.106653-06	255	Basico-Lab Cisco Miercoles 11	3		20	1
136	2020-03-30 11:24:06.117791-06	254	Basico-Lab Cisco Miercoles 9	3		20	1
137	2020-03-30 11:24:06.128762-06	253	Basico-Lab Cisco Miercoles 7	3		20	1
138	2020-03-30 11:24:06.139577-06	252	Basico-Lab Cisco Martes 17	3		20	1
139	2020-03-30 11:24:06.150662-06	251	Basico-Lab Cisco Martes 15	3		20	1
140	2020-03-30 11:24:06.161995-06	250	Basico-Lab Cisco Martes 13	3		20	1
141	2020-03-30 11:24:06.173028-06	249	Basico-Lab Cisco Martes 11	3		20	1
142	2020-03-30 11:24:06.184163-06	248	Basico-Lab Cisco Martes 9	3		20	1
143	2020-03-30 11:24:06.195347-06	247	Basico-Lab Cisco Martes 7	3		20	1
144	2020-03-30 11:24:06.206466-06	246	Basico-Lab Cisco Lunes 17	3		20	1
145	2020-03-30 11:24:06.217704-06	245	Basico-Lab Cisco Lunes 15	3		20	1
146	2020-03-30 11:24:06.228844-06	244	Basico-Lab Cisco Lunes 13	3		20	1
147	2020-03-30 11:24:06.239969-06	243	Basico-Lab Cisco Lunes 11	3		20	1
148	2020-03-30 11:24:06.251141-06	242	Basico-Lab Cisco Lunes 9	3		20	1
149	2020-03-30 11:24:06.262244-06	241	Basico-Lab Cisco Lunes 7	3		20	1
150	2020-03-30 11:24:06.273291-06	240	ATM-Lab Alcala Viernes 17	3		20	1
151	2020-03-30 11:24:06.284426-06	239	ATM-Lab Alcala Viernes 15	3		20	1
152	2020-03-30 11:24:06.295554-06	238	ATM-Lab Alcala Viernes 13	3		20	1
153	2020-03-30 11:24:06.306642-06	237	ATM-Lab Alcala Viernes 11	3		20	1
154	2020-03-30 11:24:06.317985-06	236	ATM-Lab Alcala Viernes 9	3		20	1
155	2020-03-30 11:24:06.328888-06	235	ATM-Lab Alcala Viernes 7	3		20	1
156	2020-03-30 11:24:06.339881-06	234	ATM-Lab Alcala Jueves 17	3		20	1
157	2020-03-30 11:24:06.351121-06	233	ATM-Lab Alcala Jueves 15	3		20	1
158	2020-03-30 11:24:06.362551-06	232	ATM-Lab Alcala Jueves 13	3		20	1
159	2020-03-30 11:24:06.373478-06	231	ATM-Lab Alcala Jueves 11	3		20	1
160	2020-03-30 11:24:06.384592-06	230	ATM-Lab Alcala Jueves 9	3		20	1
161	2020-03-30 11:24:06.395537-06	229	ATM-Lab Alcala Jueves 7	3		20	1
162	2020-03-30 11:24:06.406771-06	228	ATM-Lab Alcala Miercoles 17	3		20	1
163	2020-03-30 11:24:06.417973-06	227	ATM-Lab Alcala Miercoles 15	3		20	1
164	2020-03-30 11:24:06.42926-06	226	ATM-Lab Alcala Miercoles 13	3		20	1
165	2020-03-30 11:24:06.440104-06	225	ATM-Lab Alcala Miercoles 11	3		20	1
166	2020-03-30 11:24:06.451232-06	224	ATM-Lab Alcala Miercoles 9	3		20	1
167	2020-03-30 11:24:06.462478-06	223	ATM-Lab Alcala Miercoles 7	3		20	1
168	2020-03-30 11:24:06.473315-06	222	ATM-Lab Alcala Martes 17	3		20	1
169	2020-03-30 11:24:06.484413-06	221	ATM-Lab Alcala Martes 15	3		20	1
170	2020-03-30 11:24:06.495671-06	220	ATM-Lab Alcala Martes 13	3		20	1
171	2020-03-30 11:24:06.506767-06	219	ATM-Lab Alcala Martes 11	3		20	1
172	2020-03-30 11:24:06.51796-06	218	ATM-Lab Alcala Martes 9	3		20	1
173	2020-03-30 11:24:06.528818-06	217	ATM-Lab Alcala Martes 7	3		20	1
174	2020-03-30 11:24:06.53995-06	216	ATM-Lab Alcala Lunes 17	3		20	1
175	2020-03-30 11:24:06.551276-06	215	ATM-Lab Alcala Lunes 15	3		20	1
176	2020-03-30 11:24:06.562365-06	214	ATM-Lab Alcala Lunes 13	3		20	1
177	2020-03-30 11:24:06.573656-06	213	ATM-Lab Alcala Lunes 11	3		20	1
178	2020-03-30 11:24:06.584656-06	212	ATM-Lab Alcala Lunes 9	3		20	1
179	2020-03-30 11:24:06.595902-06	211	ATM-Lab Alcala Lunes 7	3		20	1
180	2020-03-30 11:24:06.606749-06	210	ATM-C9 Viernes 17	3		20	1
181	2020-03-30 11:24:06.61802-06	209	ATM-C9 Viernes 15	3		20	1
182	2020-03-30 11:24:06.629191-06	208	ATM-C9 Viernes 13	3		20	1
183	2020-03-30 11:24:06.640152-06	207	ATM-C9 Viernes 11	3		20	1
184	2020-03-30 11:24:06.651284-06	206	ATM-C9 Viernes 9	3		20	1
185	2020-03-30 11:24:06.662274-06	205	ATM-C9 Viernes 7	3		20	1
186	2020-03-30 11:24:06.673357-06	204	ATM-C9 Jueves 17	3		20	1
187	2020-03-30 11:24:06.68464-06	203	ATM-C9 Jueves 15	3		20	1
188	2020-03-30 11:24:06.695939-06	202	ATM-C9 Jueves 13	3		20	1
189	2020-03-30 11:24:06.706902-06	201	ATM-C9 Jueves 11	3		20	1
190	2020-03-30 11:24:06.717878-06	200	ATM-C9 Jueves 9	3		20	1
191	2020-03-30 11:24:06.729259-06	199	ATM-C9 Jueves 7	3		20	1
192	2020-03-30 11:24:06.740076-06	198	ATM-C9 Miercoles 17	3		20	1
193	2020-03-30 11:24:06.751418-06	197	ATM-C9 Miercoles 15	3		20	1
194	2020-03-30 11:24:06.76254-06	195	ATM-C9 Miercoles 11	3		20	1
195	2020-03-30 11:24:06.7735-06	194	ATM-C9 Miercoles 9	3		20	1
196	2020-03-30 11:24:06.784747-06	193	ATM-C9 Miercoles 7	3		20	1
197	2020-03-30 11:24:06.795931-06	192	ATM-C9 Martes 17	3		20	1
198	2020-03-30 11:24:06.806938-06	191	ATM-C9 Martes 15	3		20	1
199	2020-03-30 11:24:06.81805-06	190	ATM-C9 Martes 13	3		20	1
200	2020-03-30 11:24:06.829636-06	189	ATM-C9 Martes 11	3		20	1
201	2020-03-30 11:24:06.840178-06	188	ATM-C9 Martes 9	3		20	1
202	2020-03-30 11:24:06.851215-06	187	ATM-C9 Martes 7	3		20	1
203	2020-03-30 11:24:06.862585-06	186	ATM-C9 Lunes 17	3		20	1
204	2020-03-30 11:24:06.873733-06	185	ATM-C9 Lunes 15	3		20	1
205	2020-03-30 11:24:06.884695-06	184	ATM-C9 Lunes 13	3		20	1
206	2020-03-30 11:24:06.896144-06	183	ATM-C9 Lunes 11	3		20	1
207	2020-03-30 11:24:06.906763-06	182	ATM-C9 Lunes 9	3		20	1
208	2020-03-30 11:24:06.917938-06	181	ATM-C9 Lunes 7	3		20	1
209	2020-03-30 11:24:06.929299-06	180	ATM-C5 Viernes 17	3		20	1
210	2020-03-30 11:24:06.940588-06	179	ATM-C5 Viernes 15	3		20	1
211	2020-03-30 11:24:06.951475-06	178	ATM-C5 Viernes 13	3		20	1
212	2020-03-30 11:24:06.962541-06	177	ATM-C5 Viernes 11	3		20	1
213	2020-03-30 11:24:06.973855-06	176	ATM-C5 Viernes 9	3		20	1
214	2020-03-30 11:24:06.98474-06	175	ATM-C5 Viernes 7	3		20	1
215	2020-03-30 11:24:06.996052-06	174	ATM-C5 Jueves 17	3		20	1
216	2020-03-30 11:24:07.006841-06	173	ATM-C5 Jueves 15	3		20	1
217	2020-03-30 11:24:07.01817-06	172	ATM-C5 Jueves 13	3		20	1
218	2020-03-30 11:24:07.029364-06	171	ATM-C5 Jueves 11	3		20	1
219	2020-03-30 11:24:07.041373-06	170	ATM-C5 Jueves 9	3		20	1
220	2020-03-30 11:24:07.051517-06	169	ATM-C5 Jueves 7	3		20	1
221	2020-03-30 11:24:07.062453-06	168	ATM-C5 Miercoles 17	3		20	1
222	2020-03-30 11:24:07.073446-06	167	ATM-C5 Miercoles 15	3		20	1
223	2020-03-30 11:24:07.084792-06	166	ATM-C5 Miercoles 13	3		20	1
224	2020-03-30 11:24:07.096308-06	165	ATM-C5 Miercoles 11	3		20	1
225	2020-03-30 11:24:07.107341-06	164	ATM-C5 Miercoles 9	3		20	1
226	2020-03-30 11:24:07.118088-06	163	ATM-C5 Miercoles 7	3		20	1
227	2020-03-30 11:24:07.129179-06	162	ATM-C5 Martes 17	3		20	1
228	2020-03-30 11:24:07.140895-06	161	ATM-C5 Martes 15	3		20	1
229	2020-03-30 11:24:07.151561-06	160	ATM-C5 Martes 13	3		20	1
230	2020-03-30 11:24:07.162714-06	159	ATM-C5 Martes 11	3		20	1
231	2020-03-30 11:24:26.295294-06	158	ATM-C5 Martes 9	3		20	1
232	2020-03-30 11:24:26.316299-06	157	ATM-C5 Martes 7	3		20	1
233	2020-03-30 11:24:26.327537-06	156	ATM-C5 Lunes 17	3		20	1
234	2020-03-30 11:24:26.338482-06	155	ATM-C5 Lunes 15	3		20	1
235	2020-03-30 11:24:26.349654-06	154	ATM-C5 Lunes 13	3		20	1
236	2020-03-30 11:24:26.361054-06	153	ATM-C5 Lunes 11	3		20	1
237	2020-03-30 11:24:26.371805-06	152	ATM-C5 Lunes 9	3		20	1
238	2020-03-30 11:24:26.382959-06	151	ATM-C5 Lunes 7	3		20	1
239	2020-03-30 11:24:26.394431-06	150	ATM-C4 Viernes 17	3		20	1
240	2020-03-30 11:24:26.405132-06	149	ATM-C4 Viernes 15	3		20	1
241	2020-03-30 11:24:26.416277-06	148	ATM-C4 Viernes 13	3		20	1
242	2020-03-30 11:24:26.427886-06	147	ATM-C4 Viernes 11	3		20	1
243	2020-03-30 11:24:26.438478-06	146	ATM-C4 Viernes 9	3		20	1
244	2020-03-30 11:24:26.449616-06	145	ATM-C4 Viernes 7	3		20	1
245	2020-03-30 11:24:26.460634-06	144	ATM-C4 Jueves 17	3		20	1
246	2020-03-30 11:24:26.471864-06	143	ATM-C4 Jueves 15	3		20	1
247	2020-03-30 11:24:26.482917-06	142	ATM-C4 Jueves 13	3		20	1
248	2020-03-30 11:24:26.493964-06	141	ATM-C4 Jueves 11	3		20	1
249	2020-03-30 11:24:26.505059-06	140	ATM-C4 Jueves 9	3		20	1
250	2020-03-30 11:24:26.516202-06	139	ATM-C4 Jueves 7	3		20	1
251	2020-03-30 11:24:26.52725-06	138	ATM-C4 Miercoles 17	3		20	1
252	2020-03-30 11:24:26.538327-06	137	ATM-C4 Miercoles 15	3		20	1
253	2020-03-30 11:24:26.5493-06	136	ATM-C4 Miercoles 13	3		20	1
254	2020-03-30 11:24:26.560393-06	135	ATM-C4 Miercoles 11	3		20	1
255	2020-03-30 11:24:26.571729-06	134	ATM-C4 Miercoles 9	3		20	1
256	2020-03-30 11:24:26.582915-06	133	ATM-C4 Miercoles 7	3		20	1
257	2020-03-30 11:24:26.593999-06	132	ATM-C4 Martes 17	3		20	1
258	2020-03-30 11:24:26.605247-06	131	ATM-C4 Martes 15	3		20	1
259	2020-03-30 11:24:26.616812-06	130	ATM-C4 Martes 13	3		20	1
260	2020-03-30 11:24:26.627471-06	129	ATM-C4 Martes 11	3		20	1
261	2020-03-30 11:24:26.638584-06	128	ATM-C4 Martes 9	3		20	1
262	2020-03-30 11:24:26.650004-06	127	ATM-C4 Martes 7	3		20	1
263	2020-03-30 11:24:26.660819-06	126	ATM-C4 Lunes 17	3		20	1
264	2020-03-30 11:24:26.672042-06	125	ATM-C4 Lunes 15	3		20	1
265	2020-03-30 11:24:26.68301-06	124	ATM-C4 Lunes 13	3		20	1
266	2020-03-30 11:24:26.693981-06	123	ATM-C4 Lunes 11	3		20	1
267	2020-03-30 11:24:26.705153-06	122	ATM-C4 Lunes 9	3		20	1
268	2020-03-30 11:24:26.716484-06	121	ATM-C4 Lunes 7	3		20	1
269	2020-03-30 11:24:26.727556-06	120	ATM-C2 Viernes 17	3		20	1
270	2020-03-30 11:24:26.738705-06	119	ATM-C2 Viernes 15	3		20	1
271	2020-03-30 11:24:26.749671-06	118	ATM-C2 Viernes 13	3		20	1
272	2020-03-30 11:24:26.760705-06	117	ATM-C2 Viernes 11	3		20	1
273	2020-03-30 11:24:26.771837-06	116	ATM-C2 Viernes 9	3		20	1
274	2020-03-30 11:24:26.783142-06	115	ATM-C2 Viernes 7	3		20	1
275	2020-03-30 11:24:26.794372-06	114	ATM-C2 Jueves 17	3		20	1
276	2020-03-30 11:24:26.805197-06	113	ATM-C2 Jueves 15	3		20	1
277	2020-03-30 11:24:26.816329-06	112	ATM-C2 Jueves 13	3		20	1
278	2020-03-30 11:24:26.827724-06	111	ATM-C2 Jueves 11	3		20	1
279	2020-03-30 11:24:26.838559-06	110	ATM-C2 Jueves 9	3		20	1
280	2020-03-30 11:24:26.849782-06	109	ATM-C2 Jueves 7	3		20	1
281	2020-03-30 11:24:26.860897-06	108	ATM-C2 Miercoles 17	3		20	1
282	2020-03-30 11:24:26.872006-06	107	ATM-C2 Miercoles 15	3		20	1
283	2020-03-30 11:24:26.883116-06	106	ATM-C2 Miercoles 13	3		20	1
284	2020-03-30 11:24:26.894209-06	105	ATM-C2 Miercoles 11	3		20	1
285	2020-03-30 11:24:26.905406-06	104	ATM-C2 Miercoles 9	3		20	1
286	2020-03-30 11:24:26.927827-06	103	ATM-C2 Miercoles 7	3		20	1
287	2020-03-30 11:24:26.938777-06	102	ATM-C2 Martes 17	3		20	1
288	2020-03-30 11:24:26.950126-06	101	ATM-C2 Martes 15	3		20	1
289	2020-03-30 11:24:26.960888-06	100	ATM-C2 Martes 13	3		20	1
290	2020-03-30 11:24:26.972063-06	99	ATM-C2 Martes 11	3		20	1
291	2020-03-30 11:24:26.9831-06	98	ATM-C2 Martes 9	3		20	1
292	2020-03-30 11:24:26.994294-06	97	ATM-C2 Martes 7	3		20	1
293	2020-03-30 11:24:27.005438-06	96	ATM-C2 Lunes 17	3		20	1
294	2020-03-30 11:24:27.016375-06	95	ATM-C2 Lunes 15	3		20	1
295	2020-03-30 11:24:27.02749-06	94	ATM-C2 Lunes 13	3		20	1
296	2020-03-30 11:24:27.038838-06	93	ATM-C2 Lunes 11	3		20	1
297	2020-03-30 11:24:27.049966-06	92	ATM-C2 Lunes 9	3		20	1
298	2020-03-30 11:24:27.060947-06	91	ATM-C2 Lunes 7	3		20	1
299	2020-03-30 11:24:27.072038-06	90	ATM-C3 Viernes 17	3		20	1
300	2020-03-30 11:24:27.083227-06	89	ATM-C3 Viernes 15	3		20	1
301	2020-03-30 11:24:27.094319-06	88	ATM-C3 Viernes 13	3		20	1
302	2020-03-30 11:24:27.105515-06	87	ATM-C3 Viernes 11	3		20	1
303	2020-03-30 11:24:27.11663-06	86	ATM-C3 Viernes 9	3		20	1
304	2020-03-30 11:24:27.127573-06	85	ATM-C3 Viernes 7	3		20	1
305	2020-03-30 11:24:27.138646-06	84	ATM-C3 Jueves 17	3		20	1
306	2020-03-30 11:24:27.15-06	83	ATM-C3 Jueves 15	3		20	1
307	2020-03-30 11:24:27.161163-06	82	ATM-C3 Jueves 13	3		20	1
308	2020-03-30 11:24:27.172059-06	81	ATM-C3 Jueves 11	3		20	1
309	2020-03-30 11:24:27.183206-06	80	ATM-C3 Jueves 9	3		20	1
310	2020-03-30 11:24:27.194506-06	79	ATM-C3 Jueves 7	3		20	1
311	2020-03-30 11:24:27.205339-06	78	ATM-C3 Miercoles 17	3		20	1
312	2020-03-30 11:24:27.216572-06	77	ATM-C3 Miercoles 15	3		20	1
313	2020-03-30 11:24:27.227741-06	76	ATM-C3 Miercoles 13	3		20	1
314	2020-03-30 11:24:27.238568-06	75	ATM-C3 Miercoles 11	3		20	1
315	2020-03-30 11:24:27.249922-06	74	ATM-C3 Miercoles 9	3		20	1
316	2020-03-30 11:24:27.261082-06	73	ATM-C3 Miercoles 7	3		20	1
317	2020-03-30 11:24:27.272005-06	72	ATM-C3 Martes 17	3		20	1
318	2020-03-30 11:24:27.283419-06	71	ATM-C3 Martes 15	3		20	1
319	2020-03-30 11:24:27.294397-06	70	ATM-C3 Martes 13	3		20	1
320	2020-03-30 11:24:27.305472-06	68	ATM-C3 Martes 9	3		20	1
321	2020-03-30 11:24:27.316543-06	67	ATM-C3 Martes 7	3		20	1
322	2020-03-30 11:24:27.327884-06	66	ATM-C3 Lunes 17	3		20	1
323	2020-03-30 11:24:27.338853-06	65	ATM-C3 Lunes 15	3		20	1
324	2020-03-30 11:24:27.350029-06	64	ATM-C3 Lunes 13	3		20	1
325	2020-03-30 11:24:27.361146-06	63	ATM-C3 Lunes 11	3		20	1
326	2020-03-30 11:24:27.372099-06	62	ATM-C3 Lunes 9	3		20	1
327	2020-03-30 11:24:27.383379-06	61	ATM-C3 Lunes 7	3		20	1
328	2020-03-30 11:24:27.394485-06	60	CIDS-Lab 1 Viernes 17	3		20	1
329	2020-03-30 11:24:27.405481-06	59	CIDS-Lab 1 Viernes 15	3		20	1
330	2020-03-30 11:24:27.4167-06	58	CIDS-Lab 1 Viernes 13	3		20	1
331	2020-03-30 11:24:41.01198-06	57	CIDS-Lab 1 Viernes 11	3		20	1
332	2020-03-30 11:24:41.058644-06	56	CIDS-Lab 1 Viernes 9	3		20	1
333	2020-03-30 11:24:41.103293-06	55	CIDS-Lab 1 Viernes 7	3		20	1
334	2020-03-30 11:24:41.145771-06	54	CIDS-Lab 1 Jueves 17	3		20	1
335	2020-03-30 11:24:41.192006-06	53	CIDS-Lab 1 Jueves 15	3		20	1
336	2020-03-30 11:24:41.258596-06	52	CIDS-Lab 1 Jueves 13	3		20	1
337	2020-03-30 11:24:41.301417-06	51	CIDS-Lab 1 Jueves 11	3		20	1
338	2020-03-30 11:24:41.347501-06	50	CIDS-Lab 1 Jueves 9	3		20	1
339	2020-03-30 11:24:41.358361-06	49	CIDS-Lab 1 Jueves 7	3		20	1
340	2020-03-30 11:24:41.369545-06	48	CIDS-Lab 1 Miercoles 17	3		20	1
341	2020-03-30 11:24:41.380584-06	47	CIDS-Lab 1 Miercoles 15	3		20	1
342	2020-03-30 11:24:41.391691-06	46	CIDS-Lab 1 Miercoles 13	3		20	1
343	2020-03-30 11:24:41.403012-06	45	CIDS-Lab 1 Miercoles 11	3		20	1
344	2020-03-30 11:24:41.414091-06	44	CIDS-Lab 1 Miercoles 9	3		20	1
345	2020-03-30 11:24:41.425272-06	43	CIDS-Lab 1 Miercoles 7	3		20	1
346	2020-03-30 11:24:41.436355-06	42	CIDS-Lab 1 Martes 17	3		20	1
347	2020-03-30 11:24:41.447329-06	41	CIDS-Lab 1 Martes 15	3		20	1
348	2020-03-30 11:24:41.458394-06	40	CIDS-Lab 1 Martes 13	3		20	1
349	2020-03-30 11:24:41.469684-06	39	CIDS-Lab 1 Martes 11	3		20	1
350	2020-03-30 11:24:41.480922-06	38	CIDS-Lab 1 Martes 9	3		20	1
351	2020-03-30 11:24:41.49177-06	37	CIDS-Lab 1 Martes 7	3		20	1
352	2020-03-30 11:24:41.502949-06	36	CIDS-Lab 1 Lunes 17	3		20	1
353	2020-03-30 11:24:41.514198-06	35	CIDS-Lab 1 Lunes 15	3		20	1
354	2020-03-30 11:24:41.524941-06	34	CIDS-Lab 1 Lunes 13	3		20	1
355	2020-03-30 11:24:41.536194-06	33	CIDS-Lab 1 Lunes 11	3		20	1
356	2020-03-30 11:24:41.547212-06	32	CIDS-Lab 1 Lunes 9	3		20	1
357	2020-03-30 11:24:41.558227-06	31	CIDS-Lab 1 Lunes 7	3		20	1
358	2020-03-30 11:24:41.569564-06	30	CIDS-Hardware Viernes 17	3		20	1
359	2020-03-30 11:24:41.580726-06	29	CIDS-Hardware Viernes 15	3		20	1
360	2020-03-30 11:24:41.591546-06	28	CIDS-Hardware Viernes 13	3		20	1
361	2020-03-30 11:24:41.602803-06	27	CIDS-Hardware Viernes 11	3		20	1
362	2020-03-30 11:24:41.614121-06	26	CIDS-Hardware Viernes 9	3		20	1
363	2020-03-30 11:24:41.625095-06	25	CIDS-Hardware Viernes 7	3		20	1
364	2020-03-30 11:24:41.636379-06	24	CIDS-Hardware Jueves 17	3		20	1
365	2020-03-30 11:24:41.647516-06	23	CIDS-Hardware Jueves 15	3		20	1
366	2020-03-30 11:24:41.658365-06	22	CIDS-Hardware Jueves 13	3		20	1
367	2020-03-30 11:24:41.669521-06	21	CIDS-Hardware Jueves 11	3		20	1
368	2020-03-30 11:24:41.680939-06	20	CIDS-Hardware Jueves 9	3		20	1
369	2020-03-30 11:24:41.691837-06	19	CIDS-Hardware Jueves 7	3		20	1
370	2020-03-30 11:24:41.702986-06	18	CIDS-Hardware Miercoles 17	3		20	1
371	2020-03-30 11:24:41.714362-06	17	CIDS-Hardware Miercoles 15	3		20	1
372	2020-03-30 11:24:41.725224-06	16	CIDS-Hardware Miercoles 13	3		20	1
373	2020-03-30 11:24:41.73619-06	15	CIDS-Hardware Miercoles 11	3		20	1
374	2020-03-30 11:24:41.747192-06	14	CIDS-Hardware Miercoles 9	3		20	1
375	2020-03-30 11:24:41.758626-06	13	CIDS-Hardware Miercoles 7	3		20	1
376	2020-03-30 11:24:41.769623-06	12	CIDS-Hardware Martes 17	3		20	1
377	2020-03-30 11:24:41.78114-06	11	CIDS-Hardware Martes 15	3		20	1
378	2020-03-30 11:24:41.791901-06	10	CIDS-Hardware Martes 13	3		20	1
379	2020-03-30 11:24:41.803114-06	9	CIDS-Hardware Martes 11	3		20	1
380	2020-03-30 11:24:41.814105-06	8	CIDS-Hardware Martes 9	3		20	1
381	2020-03-30 11:24:41.825162-06	7	CIDS-Hardware Martes 7	3		20	1
382	2020-03-30 11:24:41.836453-06	6	CIDS-Hardware Lunes 17	3		20	1
383	2020-03-30 11:24:41.848074-06	5	CIDS-Hardware Lunes 15	3		20	1
384	2020-03-30 11:24:41.858729-06	4	CIDS-Hardware Lunes 13	3		20	1
385	2020-03-30 11:24:41.869823-06	3	CIDS-Hardware Lunes 11	3		20	1
386	2020-03-30 11:24:41.880857-06	1	CIDS-Hardware Lunes 7	3		20	1
387	2020-03-30 11:26:15.112395-06	3	Calculo I 2019 semestre 2	2	[{"changed": {"fields": ["grupo_horas_clase"]}}]	12	1
388	2020-03-30 11:27:43.82544-06	1	Calculo I 2019 semestre 2	2	[{"changed": {"fields": ["grupo_horas_clase"]}}]	12	1
389	2020-04-08 19:19:42.440545-06	129	Investigacion II 2019 semestre 2	2	[{"changed": {"fields": ["grupo_horas_clase"]}}]	12	1
\.


--
-- TOC entry 3334 (class 0 OID 16399)
-- Dependencies: 199
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	auth	user
5	contenttypes	contenttype
6	sessions	session
7	facultades	facultad
8	docentes	docente
9	aulas	aula
10	recintos	recinto
11	carreras	carrera
12	grupos	grupo
13	departamento	departamento
14	plan_de_estudio	plandeestudio
15	area	area
16	componentes	componente
17	docente_area	docentearea
18	planificacion	planificacion
19	docente_horas	docentehoras
20	horario	horario
21	authtoken	token
\.


--
-- TOC entry 3332 (class 0 OID 16388)
-- Dependencies: 197
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2020-03-05 02:22:47.354914-06
2	auth	0001_initial	2020-03-05 02:22:47.87643-06
3	admin	0001_initial	2020-03-05 02:22:48.832103-06
4	admin	0002_logentry_remove_auto_add	2020-03-05 02:22:48.962309-06
5	admin	0003_logentry_add_action_flag_choices	2020-03-05 02:22:48.976594-06
6	area	0001_initial	2020-03-05 02:22:49.043731-06
7	area	0002_auto_20190619_1752	2020-03-05 02:22:49.061762-06
8	area	0003_auto_20190719_2214	2020-03-05 02:22:49.217825-06
9	area	0004_auto_20190903_0019	2020-03-05 02:22:49.334968-06
10	area	0005_auto_20191122_0940	2020-03-05 02:22:49.363511-06
11	facultades	0001_initial	2020-03-05 02:22:49.412366-06
12	recintos	0001_initial	2020-03-05 02:22:49.491112-06
13	aulas	0001_initial	2020-03-05 02:22:49.60313-06
14	aulas	0002_auto_20190719_2214	2020-03-05 02:22:49.683619-06
15	aulas	0003_auto_20190903_0019	2020-03-05 02:22:49.850937-06
16	aulas	0004_auto_20191102_0245	2020-03-05 02:22:49.984715-06
17	contenttypes	0002_remove_content_type_name	2020-03-05 02:22:50.03436-06
18	auth	0002_alter_permission_name_max_length	2020-03-05 02:22:50.05297-06
19	auth	0003_alter_user_email_max_length	2020-03-05 02:22:50.071142-06
20	auth	0004_alter_user_username_opts	2020-03-05 02:22:50.090484-06
21	auth	0005_alter_user_last_login_null	2020-03-05 02:22:50.116108-06
22	auth	0006_require_contenttypes_0002	2020-03-05 02:22:50.127217-06
23	auth	0007_alter_validators_add_error_messages	2020-03-05 02:22:50.149498-06
24	auth	0008_alter_user_username_max_length	2020-03-05 02:22:50.218454-06
25	auth	0009_alter_user_last_name_max_length	2020-03-05 02:22:50.254297-06
26	auth	0010_alter_group_name_max_length	2020-03-05 02:22:50.269774-06
27	auth	0011_update_proxy_permissions	2020-03-05 02:22:50.307462-06
28	authtoken	0001_initial	2020-03-05 02:22:50.419629-06
29	authtoken	0002_auto_20160226_1747	2020-03-05 02:22:50.665143-06
30	departamento	0001_initial	2020-03-05 02:22:50.756128-06
31	carreras	0001_initial	2020-03-05 02:22:50.890455-06
32	carreras	0002_auto_20190719_2214	2020-03-05 02:22:50.974104-06
33	carreras	0003_auto_20190903_0019	2020-03-05 02:22:51.149427-06
34	carreras	0004_carrera_carrera_tipo	2020-03-05 02:22:51.273084-06
35	carreras	0005_auto_20191122_0604	2020-03-05 02:22:51.304352-06
36	carreras	0006_auto_20191122_0607	2020-03-05 02:22:51.321114-06
37	carreras	0007_auto_20191122_0609	2020-03-05 02:22:51.345896-06
38	plan_de_estudio	0001_initial	2020-03-05 02:22:51.418668-06
39	componentes	0001_initial	2020-03-05 02:22:51.552324-06
40	componentes	0002_auto_20190719_2214	2020-03-05 02:22:51.692372-06
41	componentes	0003_auto_20190903_0019	2020-03-05 02:22:52.014939-06
42	componentes	0004_componente_componente_credito	2020-03-05 02:22:52.194342-06
43	componentes	0005_auto_20191102_0245	2020-03-05 02:22:52.225002-06
44	componentes	0006_auto_20191102_0253	2020-03-05 02:22:52.236035-06
45	componentes	0007_auto_20191102_0257	2020-03-05 02:22:52.248677-06
46	componentes	0008_auto_20191102_0300	2020-03-05 02:22:52.260387-06
47	componentes	0009_auto_20191102_0301	2020-03-05 02:22:52.290491-06
48	componentes	0010_auto_20191102_0302	2020-03-05 02:22:52.304926-06
49	componentes	0011_auto_20191122_0614	2020-03-05 02:22:52.340227-06
50	componentes	0012_auto_20191122_0914	2020-03-05 02:22:52.363031-06
51	componentes	0013_auto_20191122_0915	2020-03-05 02:22:52.384286-06
52	componentes	0014_auto_20191123_0328	2020-03-05 02:22:52.406023-06
53	departamento	0002_auto_20190719_2214	2020-03-05 02:22:52.440326-06
54	departamento	0003_auto_20190903_0019	2020-03-05 02:22:52.651849-06
55	docentes	0001_initial	2020-03-05 02:22:52.740995-06
56	docente_area	0001_initial	2020-03-05 02:22:52.875415-06
57	docente_area	0002_auto_20190619_1752	2020-03-05 02:22:52.990665-06
58	docente_area	0003_auto_20190719_2214	2020-03-05 02:22:53.010808-06
59	docente_area	0004_auto_20190903_0019	2020-03-05 02:22:53.327086-06
60	planificacion	0001_initial	2020-03-05 02:22:53.393433-06
61	docente_horas	0001_initial	2020-03-05 02:22:53.490252-06
62	docente_horas	0002_auto_20190619_1752	2020-03-05 02:22:53.613729-06
63	docente_horas	0003_auto_20190719_2214	2020-03-05 02:22:53.634689-06
64	docente_horas	0004_auto_20190903_0019	2020-03-05 02:22:53.958157-06
65	docente_horas	0005_auto_20190903_0237	2020-03-05 02:22:54.291506-06
66	docente_horas	0006_auto_20191119_0142	2020-03-05 02:22:54.337461-06
67	docentes	0002_auto_20190719_2214	2020-03-05 02:22:54.384325-06
68	docentes	0003_docente_docente_hname	2020-03-05 02:22:54.493314-06
69	docentes	0004_auto_20190903_0019	2020-03-05 02:22:54.730516-06
70	docentes	0005_auto_20191102_0306	2020-03-05 02:22:54.763023-06
71	facultades	0002_auto_20190619_1752	2020-03-05 02:22:54.77807-06
72	facultades	0003_auto_20190719_2214	2020-03-05 02:22:54.829749-06
73	facultades	0004_auto_20190903_0019	2020-03-05 02:22:54.965251-06
74	planificacion	0002_auto_20190619_1752	2020-03-05 02:22:54.98939-06
75	planificacion	0003_auto_20190719_2214	2020-03-05 02:22:55.023429-06
76	planificacion	0004_auto_20190903_0019	2020-03-05 02:22:55.416473-06
77	planificacion	0005_auto_20190923_0743	2020-03-05 02:22:55.435397-06
78	planificacion	0006_auto_20190923_0758	2020-03-05 02:22:55.457275-06
79	planificacion	0007_auto_20190923_0806	2020-03-05 02:22:55.522479-06
80	planificacion	0008_auto_20190923_0811	2020-03-05 02:22:55.546417-06
81	planificacion	0009_auto_20190923_0816	2020-03-05 02:22:55.567991-06
82	planificacion	0010_auto_20190923_0819	2020-03-05 02:22:55.648996-06
83	grupos	0001_initial	2020-03-05 02:22:55.723672-06
84	grupos	0002_auto_20190719_2214	2020-03-05 02:22:55.972074-06
85	grupos	0003_auto_20190903_0019	2020-03-05 02:22:56.48894-06
86	grupos	0004_auto_20190903_0323	2020-03-05 02:22:56.790353-06
87	grupos	0005_auto_20190923_0743	2020-03-05 02:22:56.826762-06
88	grupos	0006_auto_20191102_0207	2020-03-05 02:22:56.859327-06
89	grupos	0007_auto_20191119_0143	2020-03-05 02:22:56.935151-06
90	grupos	0008_auto_20191119_0147	2020-03-05 02:22:57.024577-06
91	grupos	0009_auto_20191119_0147	2020-03-05 02:22:57.113983-06
92	grupos	0010_auto_20191119_0159	2020-03-05 02:22:57.217538-06
93	grupos	0011_auto_20191122_0614	2020-03-05 02:22:57.279689-06
94	grupos	0012_grupo_grupo_asignado	2020-03-05 02:22:57.551509-06
95	horario	0001_initial	2020-03-05 02:22:57.6402-06
96	horario	0002_auto_20190619_1514	2020-03-05 02:22:57.783495-06
97	horario	0003_auto_20190619_1535	2020-03-05 02:22:57.809948-06
98	horario	0004_auto_20190619_1656	2020-03-05 02:22:57.876883-06
99	horario	0005_auto_20190619_1658	2020-03-05 02:22:57.955384-06
100	horario	0006_auto_20190826_0137	2020-03-05 02:22:57.990482-06
101	horario	0007_auto_20190826_0139	2020-03-05 02:22:58.004394-06
102	horario	0008_auto_20190829_0015	2020-03-05 02:22:58.247465-06
103	horario	0009_auto_20190903_0019	2020-03-05 02:22:58.76455-06
104	plan_de_estudio	0002_auto_20190619_1752	2020-03-05 02:22:58.798083-06
105	plan_de_estudio	0003_auto_20190821_1818	2020-03-05 02:22:58.829909-06
106	plan_de_estudio	0004_auto_20190903_0019	2020-03-05 02:22:59.100712-06
107	plan_de_estudio	0005_auto_20191122_0614	2020-03-05 02:22:59.155199-06
108	planificacion	0011_auto_20191122_0614	2020-03-05 02:22:59.170668-06
109	recintos	0002_auto_20190719_2214	2020-03-05 02:22:59.211682-06
110	recintos	0003_auto_20190903_0019	2020-03-05 02:22:59.460419-06
111	sessions	0001_initial	2020-03-05 02:22:59.605054-06
112	plan_de_estudio	0006_auto_20200305_0823	2020-03-05 02:23:37.263678-06
113	planificacion	0012_auto_20200305_0823	2020-03-05 02:23:37.293794-06
114	planificacion	0012_auto_20200214_0334	2020-03-08 12:10:07.020828-06
115	grupos	0013_auto_20200227_2007	2020-03-08 12:10:07.791754-06
116	grupos	0014_auto_20200308_1155	2020-03-08 12:10:07.891802-06
117	horario	0010_auto_20200228_1953	2020-03-08 12:10:08.194635-06
118	horario	0011_auto_20200304_1450	2020-03-08 12:10:08.264604-06
119	plan_de_estudio	0006_auto_20200214_0334	2020-03-08 12:10:08.294285-06
120	plan_de_estudio	0006_auto_20200208_0229	2020-03-08 12:10:08.316301-06
121	plan_de_estudio	0007_merge_20200215_1144	2020-03-08 12:10:08.321953-06
122	planificacion	0012_auto_20200208_0229	2020-03-08 12:10:08.348427-06
123	planificacion	0013_merge_20200215_1144	2020-03-08 12:10:08.355133-06
124	horario	0012_auto_20200313_2338	2020-03-14 02:48:42.82251-06
\.


--
-- TOC entry 3378 (class 0 OID 17144)
-- Dependencies: 243
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
1ptn1ofgx3trx33tca7g37zg5v167goz	NzFiZDViM2U0MmZlOGYzNGE2YTZlZWIxYWRkYTA2OTEyNzM4YzQ2ZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJiZDk1ZmFkZDRhNmYzMzY0MTFjNDhlOWRmY2E5ODFiZTg0MDBmZWJjIn0=	2020-03-19 02:30:47.654902-06
v9yq13blvsicg50mz5wayug8t5hpoac0	NzFiZDViM2U0MmZlOGYzNGE2YTZlZWIxYWRkYTA2OTEyNzM4YzQ2ZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJiZDk1ZmFkZDRhNmYzMzY0MTFjNDhlOWRmY2E5ODFiZTg0MDBmZWJjIn0=	2020-04-05 17:00:48.660982-06
n2gczfhlgbq2agz3962oyguz8jld4uoa	NzFiZDViM2U0MmZlOGYzNGE2YTZlZWIxYWRkYTA2OTEyNzM4YzQ2ZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJiZDk1ZmFkZDRhNmYzMzY0MTFjNDhlOWRmY2E5ODFiZTg0MDBmZWJjIn0=	2020-04-22 19:13:49.757957-06
i7fvmlnrdd4gbjjlcx0iv3k17z19na31	NzFiZDViM2U0MmZlOGYzNGE2YTZlZWIxYWRkYTA2OTEyNzM4YzQ2ZTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJiZDk1ZmFkZDRhNmYzMzY0MTFjNDhlOWRmY2E5ODFiZTg0MDBmZWJjIn0=	2020-05-11 19:15:59.924312-06
\.


--
-- TOC entry 3364 (class 0 OID 16774)
-- Dependencies: 229
-- Data for Name: docente_area_docentearea; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.docente_area_docentearea (da_id, da_area_id, da_docente_id, created_at, updated_at) FROM stdin;
305	17	20	2020-03-12 19:26:12.737506-06	2020-03-12 19:26:12.737544-06
306	22	20	2020-03-12 19:26:12.749937-06	2020-03-12 19:26:12.749976-06
307	21	20	2020-03-12 19:26:12.76248-06	2020-03-12 19:26:12.762522-06
308	19	20	2020-03-12 19:26:12.78158-06	2020-03-12 19:26:12.781607-06
309	23	20	2020-03-12 19:26:12.793655-06	2020-03-12 19:26:12.793695-06
310	16	20	2020-03-12 19:26:12.803771-06	2020-03-12 19:26:12.803798-06
316	17	23	2020-03-12 19:35:31.36589-06	2020-03-12 19:35:31.365927-06
317	22	23	2020-03-12 19:35:31.408147-06	2020-03-12 19:35:31.408203-06
318	21	23	2020-03-12 19:35:31.460973-06	2020-03-12 19:35:31.461011-06
319	19	23	2020-03-12 19:35:31.506326-06	2020-03-12 19:35:31.506354-06
320	23	23	2020-03-12 19:35:31.549749-06	2020-03-12 19:35:31.549803-06
321	1	23	2020-03-12 19:35:31.571048-06	2020-03-12 19:35:31.571075-06
322	16	23	2020-03-12 19:35:31.628153-06	2020-03-12 19:35:31.628195-06
329	17	22	2020-03-12 19:46:17.635216-06	2020-03-12 19:46:17.635265-06
199	22	26	2020-03-12 17:08:27.092898-06	2020-03-12 17:08:27.092947-06
200	19	26	2020-03-12 17:08:27.1055-06	2020-03-12 17:08:27.105538-06
17	17	6	2020-03-08 07:38:20.274748-06	2020-03-08 07:38:20.274799-06
18	1	6	2020-03-08 07:38:20.325708-06	2020-03-08 07:38:20.325754-06
19	15	6	2020-03-08 07:38:20.345467-06	2020-03-08 07:38:20.345504-06
330	21	22	2020-03-12 19:46:17.64666-06	2020-03-12 19:46:17.646699-06
331	23	22	2020-03-12 19:46:17.657845-06	2020-03-12 19:46:17.657883-06
332	1	22	2020-03-12 19:46:17.670276-06	2020-03-12 19:46:17.670334-06
201	23	26	2020-03-12 17:08:27.117818-06	2020-03-12 17:08:27.117856-06
202	1	26	2020-03-12 17:08:27.182228-06	2020-03-12 17:08:27.18227-06
203	16	26	2020-03-12 17:08:27.202836-06	2020-03-12 17:08:27.202872-06
333	16	22	2020-03-12 19:46:17.678799-06	2020-03-12 19:46:17.678826-06
334	15	22	2020-03-12 19:46:17.689557-06	2020-03-12 19:46:17.689595-06
38	22	13	2020-03-08 07:44:23.138016-06	2020-03-08 07:44:23.138062-06
39	19	13	2020-03-08 07:44:23.20283-06	2020-03-08 07:44:23.202895-06
40	1	13	2020-03-08 07:44:23.223329-06	2020-03-08 07:44:23.223387-06
210	22	9	2020-03-12 17:18:04.983551-06	2020-03-12 17:18:04.983598-06
211	19	9	2020-03-12 17:18:04.999129-06	2020-03-12 17:18:04.999168-06
212	23	9	2020-03-12 17:18:05.019686-06	2020-03-12 17:18:05.019745-06
213	1	9	2020-03-12 17:18:05.041444-06	2020-03-12 17:18:05.041485-06
214	17	17	2020-03-12 17:18:13.328305-06	2020-03-12 17:18:13.328344-06
215	22	17	2020-03-12 17:18:13.339663-06	2020-03-12 17:18:13.33969-06
216	19	17	2020-03-12 17:18:13.351935-06	2020-03-12 17:18:13.351968-06
217	23	17	2020-03-12 17:18:13.362836-06	2020-03-12 17:18:13.362902-06
218	1	17	2020-03-12 17:18:13.372704-06	2020-03-12 17:18:13.372747-06
219	16	17	2020-03-12 17:18:13.384498-06	2020-03-12 17:18:13.384525-06
220	17	7	2020-03-12 17:35:31.264005-06	2020-03-12 17:35:31.264053-06
221	23	7	2020-03-12 17:35:31.28853-06	2020-03-12 17:35:31.288569-06
222	1	7	2020-03-12 17:35:31.299038-06	2020-03-12 17:35:31.299084-06
223	16	7	2020-03-12 17:35:31.312989-06	2020-03-12 17:35:31.31303-06
224	15	7	2020-03-12 17:35:31.3327-06	2020-03-12 17:35:31.332739-06
225	17	5	2020-03-12 17:43:23.802491-06	2020-03-12 17:43:23.802529-06
226	22	5	2020-03-12 17:43:23.827406-06	2020-03-12 17:43:23.827447-06
227	19	5	2020-03-12 17:43:23.838742-06	2020-03-12 17:43:23.839158-06
228	17	25	2020-03-12 17:43:30.372797-06	2020-03-12 17:43:30.372842-06
229	22	25	2020-03-12 17:43:30.385936-06	2020-03-12 17:43:30.385986-06
230	21	25	2020-03-12 17:43:30.406932-06	2020-03-12 17:43:30.406971-06
231	19	25	2020-03-12 17:43:30.420221-06	2020-03-12 17:43:30.420248-06
232	23	25	2020-03-12 17:43:30.439089-06	2020-03-12 17:43:30.439116-06
233	1	25	2020-03-12 17:43:30.449748-06	2020-03-12 17:43:30.449774-06
234	16	25	2020-03-12 17:43:30.46139-06	2020-03-12 17:43:30.461442-06
238	17	27	2020-03-12 17:46:00.540066-06	2020-03-12 17:46:00.540095-06
239	22	27	2020-03-12 17:46:00.559-06	2020-03-12 17:46:00.559049-06
240	19	27	2020-03-12 17:46:00.56991-06	2020-03-12 17:46:00.569937-06
86	17	29	2020-03-08 10:39:13.2176-06	2020-03-08 10:39:13.217633-06
87	23	29	2020-03-08 10:39:13.249694-06	2020-03-08 10:39:13.249747-06
88	1	29	2020-03-08 10:39:13.265823-06	2020-03-08 10:39:13.265868-06
89	1	30	2020-03-08 10:39:41.337994-06	2020-03-08 10:39:41.338023-06
90	16	30	2020-03-08 10:39:41.37081-06	2020-03-08 10:39:41.370853-06
91	17	31	2020-03-08 10:41:39.50575-06	2020-03-08 10:41:39.505779-06
92	22	31	2020-03-08 10:41:39.534562-06	2020-03-08 10:41:39.534659-06
93	19	31	2020-03-08 10:41:39.552968-06	2020-03-08 10:41:39.552997-06
241	1	27	2020-03-12 17:46:00.579599-06	2020-03-12 17:46:00.579639-06
95	17	32	2020-03-08 11:19:11.44652-06	2020-03-08 11:19:11.44655-06
96	22	32	2020-03-08 11:19:11.459576-06	2020-03-08 11:19:11.459618-06
97	21	32	2020-03-08 11:19:11.471765-06	2020-03-08 11:19:11.471797-06
98	19	32	2020-03-08 11:19:11.482384-06	2020-03-08 11:19:11.482456-06
99	23	32	2020-03-08 11:19:11.493514-06	2020-03-08 11:19:11.49356-06
100	1	32	2020-03-08 11:19:11.505772-06	2020-03-08 11:19:11.505816-06
101	16	32	2020-03-08 11:19:11.517135-06	2020-03-08 11:19:11.517186-06
102	15	32	2020-03-08 11:19:11.527966-06	2020-03-08 11:19:11.528006-06
103	20	32	2020-03-08 11:19:11.538154-06	2020-03-08 11:19:11.538184-06
242	16	27	2020-03-12 17:46:00.590582-06	2020-03-12 17:46:00.590626-06
105	17	19	2020-03-08 13:28:53.716104-06	2020-03-08 13:28:53.716152-06
106	23	19	2020-03-08 13:28:53.730615-06	2020-03-08 13:28:53.730665-06
107	1	19	2020-03-08 13:28:53.740334-06	2020-03-08 13:28:53.740364-06
108	15	19	2020-03-08 13:28:53.754367-06	2020-03-08 13:28:53.754417-06
243	15	27	2020-03-12 17:46:00.603321-06	2020-03-12 17:46:00.603348-06
113	22	15	2020-03-08 13:37:32.620545-06	2020-03-08 13:37:32.620577-06
114	19	15	2020-03-08 13:37:32.653672-06	2020-03-08 13:37:32.653732-06
115	1	15	2020-03-08 13:37:32.673233-06	2020-03-08 13:37:32.673318-06
121	21	28	2020-03-08 20:46:26.287302-06	2020-03-08 20:46:26.287351-06
122	19	28	2020-03-08 20:46:26.300804-06	2020-03-08 20:46:26.300854-06
159	17	3	2020-03-08 23:11:36.09493-06	2020-03-08 23:11:36.094961-06
160	22	3	2020-03-08 23:11:36.107858-06	2020-03-08 23:11:36.107899-06
161	19	3	2020-03-08 23:11:36.118499-06	2020-03-08 23:11:36.118545-06
162	23	3	2020-03-08 23:11:36.129473-06	2020-03-08 23:11:36.129516-06
163	1	3	2020-03-08 23:11:36.139342-06	2020-03-08 23:11:36.139373-06
173	17	8	2020-03-12 15:13:49.628219-06	2020-03-12 15:13:49.628256-06
174	22	8	2020-03-12 15:13:49.687291-06	2020-03-12 15:13:49.687339-06
175	19	8	2020-03-12 15:13:49.706691-06	2020-03-12 15:13:49.706746-06
176	1	8	2020-03-12 15:13:49.716403-06	2020-03-12 15:13:49.716428-06
184	17	21	2020-03-12 17:02:26.258574-06	2020-03-12 17:02:26.258602-06
185	19	21	2020-03-12 17:02:26.269281-06	2020-03-12 17:02:26.269317-06
186	23	21	2020-03-12 17:02:26.279816-06	2020-03-12 17:02:26.279857-06
187	1	21	2020-03-12 17:02:26.294969-06	2020-03-12 17:02:26.295013-06
188	16	21	2020-03-12 17:02:26.315664-06	2020-03-12 17:02:26.315701-06
189	15	21	2020-03-12 17:02:26.326804-06	2020-03-12 17:02:26.326846-06
311	17	34	2020-03-12 19:31:09.572595-06	2020-03-12 19:31:09.572661-06
312	22	34	2020-03-12 19:31:09.614675-06	2020-03-12 19:31:09.614731-06
313	21	34	2020-03-12 19:31:09.634791-06	2020-03-12 19:31:09.634834-06
247	17	18	2020-03-12 18:38:29.979682-06	2020-03-12 18:38:29.979723-06
248	22	18	2020-03-12 18:38:29.993141-06	2020-03-12 18:38:29.993185-06
249	21	18	2020-03-12 18:38:30.018229-06	2020-03-12 18:38:30.018254-06
250	19	18	2020-03-12 18:38:30.036249-06	2020-03-12 18:38:30.036289-06
251	1	18	2020-03-12 18:38:30.048892-06	2020-03-12 18:38:30.048973-06
252	17	10	2020-03-12 18:38:34.769313-06	2020-03-12 18:38:34.769352-06
253	22	10	2020-03-12 18:38:34.781032-06	2020-03-12 18:38:34.781072-06
254	21	10	2020-03-12 18:38:34.791891-06	2020-03-12 18:38:34.791931-06
255	19	10	2020-03-12 18:38:34.803775-06	2020-03-12 18:38:34.803815-06
256	1	10	2020-03-12 18:38:34.814694-06	2020-03-12 18:38:34.814734-06
257	16	10	2020-03-12 18:38:34.825688-06	2020-03-12 18:38:34.825727-06
314	19	34	2020-03-12 19:31:09.645986-06	2020-03-12 19:31:09.646029-06
315	1	34	2020-03-12 19:31:09.65709-06	2020-03-12 19:31:09.657129-06
323	17	14	2020-03-12 19:45:26.576617-06	2020-03-12 19:45:26.576658-06
324	21	14	2020-03-12 19:45:26.598666-06	2020-03-12 19:45:26.598705-06
262	17	33	2020-03-12 19:14:00.523418-06	2020-03-12 19:14:00.523448-06
263	22	33	2020-03-12 19:14:00.536991-06	2020-03-12 19:14:00.53704-06
264	21	33	2020-03-12 19:14:00.547807-06	2020-03-12 19:14:00.547843-06
265	19	33	2020-03-12 19:14:00.557754-06	2020-03-12 19:14:00.557784-06
276	22	12	2020-03-12 19:18:26.273838-06	2020-03-12 19:18:26.273879-06
277	19	12	2020-03-12 19:18:26.28584-06	2020-03-12 19:18:26.285881-06
278	23	12	2020-03-12 19:18:26.298701-06	2020-03-12 19:18:26.298743-06
279	1	12	2020-03-12 19:18:26.308793-06	2020-03-12 19:18:26.308833-06
280	17	4	2020-03-12 19:20:34.08051-06	2020-03-12 19:20:34.08054-06
281	21	4	2020-03-12 19:20:34.095325-06	2020-03-12 19:20:34.095367-06
282	19	4	2020-03-12 19:20:34.106048-06	2020-03-12 19:20:34.106092-06
283	1	4	2020-03-12 19:20:34.118488-06	2020-03-12 19:20:34.118533-06
284	15	4	2020-03-12 19:20:34.139294-06	2020-03-12 19:20:34.139337-06
290	17	16	2020-03-12 19:22:30.890012-06	2020-03-12 19:22:30.890054-06
291	22	16	2020-03-12 19:22:30.902369-06	2020-03-12 19:22:30.902409-06
292	21	16	2020-03-12 19:22:30.913491-06	2020-03-12 19:22:30.913532-06
293	19	16	2020-03-12 19:22:30.925611-06	2020-03-12 19:22:30.92565-06
294	23	16	2020-03-12 19:22:30.935472-06	2020-03-12 19:22:30.935573-06
295	1	16	2020-03-12 19:22:30.946812-06	2020-03-12 19:22:30.94685-06
296	16	16	2020-03-12 19:22:30.958731-06	2020-03-12 19:22:30.958759-06
297	17	2	2020-03-12 19:23:36.08354-06	2020-03-12 19:23:36.083581-06
298	19	2	2020-03-12 19:23:36.095139-06	2020-03-12 19:23:36.09519-06
299	1	2	2020-03-12 19:23:36.10621-06	2020-03-12 19:23:36.106249-06
300	16	2	2020-03-12 19:23:36.118431-06	2020-03-12 19:23:36.118478-06
301	17	11	2020-03-12 19:23:43.316905-06	2020-03-12 19:23:43.316946-06
302	21	11	2020-03-12 19:23:43.329553-06	2020-03-12 19:23:43.329582-06
303	1	11	2020-03-12 19:23:43.341391-06	2020-03-12 19:23:43.341434-06
304	16	11	2020-03-12 19:23:43.352767-06	2020-03-12 19:23:43.352814-06
325	19	14	2020-03-12 19:45:26.611178-06	2020-03-12 19:45:26.611219-06
326	1	14	2020-03-12 19:45:26.621007-06	2020-03-12 19:45:26.62105-06
327	16	14	2020-03-12 19:45:26.632726-06	2020-03-12 19:45:26.632781-06
328	15	14	2020-03-12 19:45:26.654597-06	2020-03-12 19:45:26.654644-06
335	17	24	2020-03-12 19:47:32.12884-06	2020-03-12 19:47:32.128881-06
336	22	24	2020-03-12 19:47:32.142602-06	2020-03-12 19:47:32.142641-06
337	21	24	2020-03-12 19:47:32.152897-06	2020-03-12 19:47:32.152938-06
338	1	24	2020-03-12 19:47:32.165123-06	2020-03-12 19:47:32.165165-06
339	16	24	2020-03-12 19:47:32.185611-06	2020-03-12 19:47:32.185651-06
340	15	24	2020-03-12 19:47:32.1971-06	2020-03-12 19:47:32.197139-06
\.


--
-- TOC entry 3367 (class 0 OID 16815)
-- Dependencies: 232
-- Data for Name: docente_horas_docentehoras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.docente_horas_docentehoras (dh_id, dh_horas_total, dh_docente_id, dh_planificacion_id, created_at, updated_at, dh_horas_hor, dh_horas_planta) FROM stdin;
1	12	2	1	2020-03-08 10:44:21.965329-06	2020-03-08 10:44:21.965383-06	0	12
2	12	3	1	2020-03-08 10:44:44.386678-06	2020-03-08 10:44:44.386718-06	0	12
3	12	4	1	2020-03-08 10:45:07.715479-06	2020-03-08 10:45:07.715509-06	0	12
4	4	5	1	2020-03-08 10:48:20.969898-06	2020-03-08 10:48:20.969931-06	0	4
5	12	6	1	2020-03-08 10:48:46.763658-06	2020-03-08 10:48:46.763711-06	0	12
6	12	7	1	2020-03-08 10:49:05.725608-06	2020-03-08 10:49:05.725654-06	0	12
7	12	8	1	2020-03-08 10:49:53.027491-06	2020-03-08 10:49:53.027522-06	0	12
8	12	9	1	2020-03-08 10:50:55.727318-06	2020-03-08 10:50:55.727348-06	0	12
9	18	10	1	2020-03-08 10:51:11.548235-06	2020-03-08 10:51:11.548268-06	10	8
10	12	11	1	2020-03-08 10:51:33.472726-06	2020-03-08 10:51:33.472763-06	0	12
11	18	12	1	2020-03-08 10:51:49.041195-06	2020-03-08 10:51:49.04125-06	14	4
12	12	13	1	2020-03-08 10:53:07.729546-06	2020-03-08 10:53:07.72958-06	0	12
13	12	14	1	2020-03-08 10:53:23.864937-06	2020-03-08 10:53:23.865002-06	0	12
14	8	15	1	2020-03-08 10:54:08.294122-06	2020-03-08 10:54:08.294171-06	0	8
15	18	16	1	2020-03-08 10:54:23.189828-06	2020-03-08 10:54:23.18987-06	14	4
16	12	17	1	2020-03-08 10:59:06.213985-06	2020-03-08 10:59:06.21402-06	0	12
17	12	18	1	2020-03-08 10:59:16.826939-06	2020-03-08 10:59:16.826978-06	0	12
18	12	19	1	2020-03-08 10:59:29.944945-06	2020-03-08 10:59:29.944991-06	0	12
19	18	20	1	2020-03-08 11:00:23.773022-06	2020-03-08 11:01:59.899359-06	14	4
20	12	21	1	2020-03-08 11:02:13.909164-06	2020-03-08 11:02:13.909193-06	0	12
21	12	22	1	2020-03-08 11:02:27.966841-06	2020-03-08 11:02:27.966886-06	0	12
22	18	23	1	2020-03-08 11:03:12.134209-06	2020-03-08 11:03:12.134252-06	18	0
23	18	24	1	2020-03-08 11:03:23.731021-06	2020-03-08 11:03:23.731065-06	18	0
24	18	25	1	2020-03-08 11:03:39.293603-06	2020-03-08 11:03:39.29365-06	18	0
25	18	26	1	2020-03-08 11:03:58.59775-06	2020-03-08 11:03:58.5978-06	18	0
26	8	27	1	2020-03-08 11:04:14.909881-06	2020-03-08 11:04:14.909911-06	4	4
27	8	28	1	2020-03-08 11:04:30.574248-06	2020-03-08 11:04:30.574293-06	4	4
28	4	29	1	2020-03-08 11:04:41.85839-06	2020-03-08 11:04:41.858439-06	0	4
29	8	30	1	2020-03-08 11:05:00.708228-06	2020-03-08 11:05:00.708257-06	4	4
30	8	31	1	2020-03-08 11:05:14.435151-06	2020-03-08 11:05:14.435182-06	4	4
31	18	32	1	2020-03-08 11:20:12.403792-06	2020-03-08 11:20:12.403822-06	8	10
32	60	32	2	2020-03-10 12:40:27.655681-06	2020-03-10 12:40:27.655708-06	30	30
33	8	31	2	2020-03-10 12:40:57.080477-06	2020-03-10 12:40:57.080506-06	4	4
34	8	30	2	2020-03-10 12:41:21.878877-06	2020-03-10 12:41:21.878902-06	4	4
35	4	29	2	2020-03-10 12:41:43.379201-06	2020-03-10 12:41:43.379231-06	0	4
36	8	28	2	2020-03-10 12:41:56.647739-06	2020-03-10 12:41:56.647779-06	4	4
37	8	27	2	2020-03-10 12:42:16.798254-06	2020-03-10 12:42:16.798284-06	4	4
38	18	26	2	2020-03-10 12:42:38.643817-06	2020-03-10 12:42:38.643846-06	18	0
39	18	25	2	2020-03-10 12:43:10.528556-06	2020-03-10 12:43:10.528587-06	18	0
40	18	24	2	2020-03-10 12:43:26.047008-06	2020-03-10 12:43:26.047048-06	18	0
41	18	23	2	2020-03-10 12:43:43.456622-06	2020-03-10 12:43:43.456663-06	18	0
42	12	22	2	2020-03-10 12:44:01.255932-06	2020-03-10 12:44:01.255971-06	0	12
43	12	21	2	2020-03-10 12:44:20.908674-06	2020-03-10 12:44:20.908703-06	0	12
44	18	20	2	2020-03-10 12:44:44.030995-06	2020-03-10 12:44:44.031034-06	14	4
45	12	19	2	2020-03-10 12:45:02.093253-06	2020-03-10 12:45:02.093279-06	0	12
46	12	18	2	2020-03-10 12:45:13.668893-06	2020-03-10 12:45:13.66892-06	0	12
47	12	17	2	2020-03-10 12:45:35.270426-06	2020-03-10 12:45:35.270463-06	0	12
48	18	16	2	2020-03-10 12:45:57.540468-06	2020-03-10 12:45:57.540494-06	14	4
49	8	15	2	2020-03-10 12:46:12.469467-06	2020-03-10 12:46:12.469506-06	0	8
50	12	14	2	2020-03-10 12:46:33.144666-06	2020-03-10 12:46:33.144707-06	0	12
51	12	13	2	2020-03-10 12:46:55.398599-06	2020-03-10 12:46:55.398626-06	0	12
52	18	12	2	2020-03-10 12:47:17.460279-06	2020-03-10 12:47:17.460319-06	14	4
53	12	11	2	2020-03-10 12:47:30.487424-06	2020-03-10 12:47:30.487452-06	0	12
54	18	10	2	2020-03-10 12:47:47.016453-06	2020-03-10 12:47:47.016482-06	10	8
55	12	9	2	2020-03-10 12:48:17.122691-06	2020-03-10 12:48:17.122732-06	0	12
56	12	8	2	2020-03-10 12:48:34.46572-06	2020-03-10 12:48:34.465748-06	0	12
57	12	7	2	2020-03-10 12:48:48.967578-06	2020-03-10 12:48:48.967616-06	0	12
58	12	6	2	2020-03-10 12:49:07.889993-06	2020-03-10 12:49:07.890023-06	0	12
59	4	5	2	2020-03-10 12:49:43.102692-06	2020-03-10 12:49:43.102733-06	0	4
60	12	4	2	2020-03-10 12:49:52.193265-06	2020-03-10 12:49:52.193312-06	0	12
61	12	3	2	2020-03-10 12:50:20.849368-06	2020-03-10 12:50:20.849395-06	0	12
62	12	2	2	2020-03-10 12:50:50.875844-06	2020-03-10 12:50:50.875886-06	0	12
\.


--
-- TOC entry 3363 (class 0 OID 16763)
-- Dependencies: 228
-- Data for Name: docentes_docente; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.docentes_docente (docente_nombre, docente_id, docente_tipo_contrato, docente_inss, docente_departamento_id, docente_hname, created_at, updated_at) FROM stdin;
Santiago Molina	22	H	OOO22	1		2020-03-08 09:53:26.636941-06	2020-03-12 19:46:17.504303-06
Ervin Montes	24	H	OOO24	1		2020-03-08 10:34:38.336484-06	2020-03-12 19:47:31.990221-06
Aldo Martinez	6	P	OOOO5	1		2020-03-08 07:38:19.741388-06	2020-03-08 07:38:19.741414-06
Julio Rojas	13	P	OOO12	1		2020-03-08 07:44:23.020289-06	2020-03-08 07:44:23.020315-06
Ernesto Espinoza	29	P	OOO29	1		2020-03-08 10:39:13.069691-06	2020-03-08 10:39:13.06972-06
Denis Berrios	30	H	OOO30	1		2020-03-08 10:39:41.210285-06	2020-03-08 10:39:41.210329-06
Juan Leyton	31	P	OOO31	1		2020-03-08 10:41:39.066452-06	2020-03-08 10:41:39.066495-06
Servicio	32	H	o	1		2020-03-08 11:14:21.339178-06	2020-03-08 11:19:11.308767-06
Valeria Medina	19	P	OOO18	1		2020-03-08 09:34:19.446145-06	2020-03-08 13:28:53.5451-06
Karina Esquivel	15	P	OOO14	1		2020-03-08 09:09:59.299134-06	2020-03-08 13:37:32.453151-06
Marvin Somarribas	28	P	OOO28	1		2020-03-08 10:37:50.899266-06	2020-03-08 20:46:25.782089-06
Ana Salgado	3	P	OOOO2	1		2020-03-06 19:35:50.387392-06	2020-03-08 23:11:35.920032-06
Douglas Abarca	8	P	OOOO7	1		2020-03-08 07:40:35.16202-06	2020-03-12 15:13:49.510687-06
Wilmer Matamoros	21	H	OOO21	1		2020-03-08 09:52:58.357157-06	2020-03-12 17:02:26.077953-06
David Maradiaga	26	H	OOO26	1		2020-03-08 10:36:42.101986-06	2020-03-12 17:08:26.954757-06
Francisco Zepeda	9	P	OOOO8	1		2020-03-08 07:41:05.180849-06	2020-03-12 17:18:04.83359-06
Oton Castillo	17	H	OOO16	1		2020-03-08 09:12:04.073854-06	2020-03-12 17:18:13.186382-06
Denis Espinoza	7	P	OOOO6	1		2020-03-08 07:39:17.402508-06	2020-03-12 17:35:31.060334-06
Darcy Ruiz	5	P	OOOO4	1		2020-03-06 19:37:17.151717-06	2020-03-12 17:43:23.621516-06
Davinia Quiroz	25	H	OOO25	1		2020-03-08 10:35:19.30805-06	2020-03-12 17:43:30.22286-06
Jorge Centeno	27	P	OOO27	1		2020-03-08 10:37:26.005661-06	2020-03-12 17:46:00.394423-06
Rina Arauz	18	P	OOO17	1		2020-03-08 09:33:39.556848-06	2020-03-12 18:38:29.836852-06
Jacob Narvaez	10	P	OOOO9	1		2020-03-08 07:41:46.64181-06	2020-03-12 18:38:34.626166-06
Daniel Narvaez	33	H	OOO39	1		2020-03-12 19:14:00.218208-06	2020-03-12 19:14:00.218246-06
Juan Anton	12	H	OOO11	1		2020-03-08 07:43:49.519977-06	2020-03-12 19:18:26.130177-06
Arnoldo Contreras	4	P	OOOO3	1		2020-03-06 19:36:38.944645-06	2020-03-12 19:20:33.941665-06
Miguel Barcenas	16	P	OOO15	1		2020-03-08 09:11:31.936836-06	2020-03-12 19:22:30.758203-06
Alvaro Altamirano	2	P	OOOO1	1		2020-03-06 19:35:25.786611-06	2020-03-12 19:23:35.939699-06
Johanna Hernandez	11	P	OOO10	1		2020-03-08 07:43:19.881626-06	2020-03-12 19:23:43.18331-06
William Martinez	20	H	OOO20	1		2020-03-08 09:52:30.196949-06	2020-03-12 19:26:12.597159-06
Yovania Santos	34	H	OOO48	1		2020-03-12 19:31:09.454064-06	2020-03-12 19:31:09.454093-06
Luis Diaz	23	H	OOO23	1		2020-03-08 10:33:34.308531-06	2020-03-12 19:35:31.112492-06
Julio Gonzalez	14	P	OOO13	1		2020-03-08 07:48:17.212931-06	2020-03-12 19:45:26.426051-06
\.


--
-- TOC entry 3351 (class 0 OID 16555)
-- Dependencies: 216
-- Data for Name: facultades_facultad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.facultades_facultad (facultad_nombre, facultad_id, created_at, updated_at) FROM stdin;
Ciencias y Tecnologia	1	2020-03-06 17:50:30.224227-06	2020-03-06 17:50:30.224253-06
\.


--
-- TOC entry 3372 (class 0 OID 16953)
-- Dependencies: 237
-- Data for Name: grupos_grupo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grupos_grupo (grupo_id, grupo_numero, grupo_max_capacidad, grupo_tipo, grupo_horas_clase, grupo_modo, grupo_componente_id, grupo_docente_id, grupo_planificacion_id, created_at, updated_at, grupo_planta, grupo_asignado) FROM stdin;
220	1	40	GP	2	S	147	6	2	2020-03-12 19:26:51.201035-06	2020-03-12 19:26:56.606694-06	f	f
2	2	40	GT	0	S	39	32	1	2020-03-08 11:13:25.359529-06	2020-03-30 11:38:48.852315-06	f	t
6	3	40	GT	0	S	40	32	1	2020-03-08 11:17:31.423752-06	2020-03-30 11:41:22.024816-06	f	t
20	4	40	GP	0	S	44	15	1	2020-03-08 12:46:14.177408-06	2020-03-30 11:59:50.536551-06	f	t
22	6	40	GP	0	S	44	23	1	2020-03-08 12:46:16.576209-06	2020-03-30 11:59:19.743595-06	f	t
28	3	40	GP	0	S	46	28	1	2020-03-08 20:37:06.529841-06	2020-03-31 21:42:45.709666-06	f	t
30	5	40	GP	0	S	46	12	1	2020-03-08 20:37:08.180484-06	2020-03-31 21:43:40.413893-06	f	t
16	1	40	GP	0	S	44	19	1	2020-03-08 12:46:07.61228-06	2020-03-30 12:00:21.77356-06	f	t
12	3	40	GT	0	S	42	10	1	2020-03-08 12:13:51.13952-06	2020-03-30 11:49:52.34936-06	f	t
24	2	40	GT	0	S	85	15	1	2020-03-08 13:44:43.809509-06	2020-03-31 21:37:29.941736-06	f	t
3	3	40	GT	0	S	39	32	1	2020-03-08 11:13:26.134966-06	2020-03-30 11:37:56.055049-06	f	t
5	2	40	GT	0	S	40	32	1	2020-03-08 11:17:30.968395-06	2020-03-30 11:40:08.798791-06	f	t
29	4	40	GP	0	S	46	12	1	2020-03-08 20:37:07.341733-06	2020-03-31 21:41:49.030531-06	f	t
27	2	40	GP	0	S	46	28	1	2020-03-08 20:37:05.702669-06	2020-03-31 21:42:23.356806-06	f	t
18	2	40	GP	0	S	44	3	1	2020-03-08 12:46:12.063535-06	2020-03-31 20:53:09.86319-06	f	t
15	3	40	GT	0	S	43	32	1	2020-03-08 12:33:55.246132-06	2020-03-30 11:53:15.777371-06	f	t
21	5	40	GP	0	S	44	16	1	2020-03-08 12:46:15.535491-06	2020-03-30 11:59:02.227638-06	f	t
11	2	40	GT	0	S	42	13	1	2020-03-08 12:13:50.465409-06	2020-03-30 11:51:13.77696-06	f	t
4	1	40	GT	0	S	40	32	1	2020-03-08 11:17:30.587876-06	2020-03-30 11:40:52.447674-06	f	t
1	1	40	GT	0	S	39	32	1	2020-03-08 11:13:23.623186-06	2020-03-30 11:38:46.047419-06	f	t
13	1	40	GT	0	S	43	32	1	2020-03-08 12:33:53.813275-06	2020-03-30 11:53:32.572516-06	f	t
9	3	40	GT	0	S	41	32	1	2020-03-08 12:12:49.652992-06	2020-03-30 11:46:02.467833-06	f	t
31	6	40	GP	0	S	46	31	1	2020-03-08 20:37:09.006174-06	2020-03-31 21:41:21.177182-06	f	t
14	2	40	GT	0	S	43	32	1	2020-03-08 12:33:54.589013-06	2020-03-30 11:52:57.975947-06	f	t
19	3	40	GP	0	S	44	15	1	2020-03-08 12:46:13.223494-06	2020-03-31 20:53:20.659538-06	f	t
25	3	40	GT	0	S	85	25	1	2020-03-08 13:44:44.579039-06	2020-03-31 21:37:54.073719-06	f	t
33	2	40	GT	0	S	47	32	1	2020-03-08 20:51:12.295275-06	2020-03-31 21:48:22.930383-06	f	t
78	1	40	GT	0	S	71	7	1	2020-03-08 23:23:37.298691-06	2020-03-31 23:11:31.716952-06	f	t
8	2	40	GT	0	S	41	32	1	2020-03-08 12:12:48.158456-06	2020-03-30 11:45:51.418017-06	f	t
10	1	40	GT	0	S	42	13	1	2020-03-08 12:13:49.822467-06	2020-03-30 11:49:01.901067-06	f	t
79	1	40	GP	0	S	71	7	1	2020-03-08 23:23:38.02968-06	2020-03-31 23:10:52.931442-06	f	t
26	1	40	GP	0	S	46	13	1	2020-03-08 20:37:04.74349-06	2020-03-31 21:43:05.80105-06	f	t
39	1	40	GT	0	S	50	11	1	2020-03-08 21:02:02.500372-06	2020-03-31 22:03:27.336082-06	f	t
80	2	40	GP	0	S	71	6	1	2020-03-08 23:23:38.319248-06	2020-03-31 23:11:10.163519-06	f	t
36	1	40	GP	0	S	49	26	1	2020-03-08 20:59:59.289491-06	2020-03-31 22:02:14.591804-06	f	t
34	1	40	GT	0	S	48	26	1	2020-03-08 20:55:22.508207-06	2020-03-31 21:57:40.546991-06	f	t
50	1	40	GT	0	S	54	25	1	2020-03-08 21:08:44.717112-06	2020-03-31 22:36:40.478468-06	f	t
47	1	40	GT	0	S	53	32	1	2020-03-08 21:07:53.43164-06	2020-03-31 22:34:24.680258-06	f	t
51	2	40	GT	0	S	54	25	1	2020-03-08 21:08:45.633898-06	2020-03-31 22:36:19.310448-06	f	t
35	2	40	GT	0	S	48	16	1	2020-03-08 20:55:23.224443-06	2020-03-31 21:58:06.098585-06	f	t
7	1	40	GT	0	S	41	32	1	2020-03-08 12:12:47.434071-06	2020-03-30 11:45:36.272111-06	f	t
23	1	40	GT	0	S	85	3	1	2020-03-08 13:44:43.073604-06	2020-03-31 21:39:12.295188-06	f	t
32	1	40	GT	0	S	47	32	1	2020-03-08 20:51:09.730057-06	2020-03-31 21:48:37.011698-06	f	t
37	2	40	GP	0	S	49	26	1	2020-03-08 21:00:00.048454-06	2020-03-31 22:01:56.743959-06	f	t
40	2	40	GT	0	S	50	11	1	2020-03-08 21:02:03.154789-06	2020-03-31 22:02:44.190385-06	f	t
38	3	40	GP	0	S	49	16	1	2020-03-08 21:00:00.759609-06	2020-03-31 22:01:10.053472-06	f	t
43	3	40	GP	0	S	50	11	1	2020-03-08 21:02:05.923193-06	2020-03-31 22:03:55.06796-06	f	t
42	2	40	GP	0	S	50	11	1	2020-03-08 21:02:05.191348-06	2020-03-31 22:04:10.274812-06	f	t
48	2	40	GT	0	S	53	32	1	2020-03-08 21:07:53.619677-06	2020-03-31 22:33:26.343915-06	f	t
44	1	40	GP	0	S	51	30	1	2020-03-08 21:04:43.032087-06	2020-03-31 22:32:43.93454-06	f	t
46	3	40	GP	0	S	51	17	1	2020-03-08 21:04:44.047051-06	2020-03-31 22:31:29.961225-06	f	t
45	2	40	GP	0	S	51	25	1	2020-03-08 21:04:43.524738-06	2020-03-31 22:32:14.759615-06	f	t
53	1	40	GT	0	S	57	23	1	2020-03-08 22:50:14.669346-06	2020-03-31 22:50:46.146262-06	f	t
52	1	40	GT	0	S	55	32	1	2020-03-08 22:49:04.070551-06	2020-03-31 22:50:16.541895-06	f	t
56	3	40	GP	0	S	58	24	1	2020-03-08 22:52:00.118012-06	2020-03-31 22:51:19.201143-06	f	t
55	2	40	GP	0	S	58	19	1	2020-03-08 22:51:59.497576-06	2020-03-31 22:51:31.391306-06	f	t
54	1	40	GP	0	S	58	22	1	2020-03-08 22:51:58.962718-06	2020-03-31 22:51:39.068638-06	f	t
57	1	40	GT	0	S	59	2	1	2020-03-08 22:56:23.879794-06	2020-03-31 22:52:23.761379-06	f	t
61	1	40	GP	0	S	60	6	1	2020-03-08 22:59:59.991486-06	2020-03-31 22:57:44.563968-06	f	t
58	1	40	GP	0	S	59	2	1	2020-03-08 22:56:25.186968-06	2020-03-31 22:53:25.701208-06	f	t
59	2	40	GP	0	S	59	14	1	2020-03-08 22:56:25.908579-06	2020-03-31 22:53:19.94344-06	f	t
60	1	40	GT	0	S	60	22	1	2020-03-08 22:59:59.082688-06	2020-03-31 22:56:33.156294-06	f	t
62	2	40	GP	0	S	60	6	1	2020-03-08 23:00:00.54038-06	2020-03-31 22:57:49.46231-06	f	t
65	1	40	GT	0	S	62	23	1	2020-03-08 23:05:26.599335-06	2020-03-31 23:01:29.288947-06	f	t
63	1	40	GT	0	S	61	14	1	2020-03-08 23:01:19.149792-06	2020-03-31 22:58:21.546324-06	f	t
64	2	40	GT	0	S	61	19	1	2020-03-08 23:01:20.23802-06	2020-03-31 22:58:52.083216-06	f	t
69	1	40	GT	0	S	66	3	1	2020-03-08 23:10:33.002336-06	2020-03-31 23:04:54.195278-06	f	t
67	1	40	GP	0	S	62	23	1	2020-03-08 23:05:28.842673-06	2020-03-31 23:03:14.005673-06	f	t
68	1	40	GT	0	S	65	32	1	2020-03-08 23:09:55.736369-06	2020-03-31 23:04:37.659993-06	f	t
72	1	40	GT	0	S	69	6	1	2020-03-08 23:16:50.522367-06	2020-03-31 23:06:21.489142-06	f	t
71	2	40	GP	0	S	67	21	1	2020-03-08 23:14:32.22483-06	2020-03-31 23:05:29.262371-06	f	t
70	1	40	GP	0	S	67	21	1	2020-03-08 23:14:31.455858-06	2020-03-31 23:05:51.871671-06	f	t
73	1	40	GP	0	S	69	6	1	2020-03-08 23:16:51.751807-06	2020-03-31 23:07:06.285243-06	f	t
74	2	40	GP	0	S	69	6	1	2020-03-08 23:16:52.314255-06	2020-03-31 23:07:17.975919-06	f	t
77	2	40	GP	0	S	70	24	1	2020-03-08 23:19:42.711512-06	2020-03-31 23:07:41.714347-06	f	t
76	1	40	GP	0	S	70	14	1	2020-03-08 23:19:41.834121-06	2020-03-31 23:07:53.156158-06	f	t
75	1	40	GT	0	S	70	22	1	2020-03-08 23:19:40.693094-06	2020-03-31 23:08:09.883294-06	f	t
83	2	40	GP	0	S	74	22	1	2020-03-08 23:25:14.062668-06	2020-03-31 23:10:20.413715-06	f	t
82	1	40	GP	0	S	74	22	1	2020-03-08 23:25:13.166037-06	2020-03-31 23:10:26.277903-06	f	t
84	1	40	GT	0	S	1	32	1	2020-03-12 15:11:06.363094-06	2020-04-08 18:23:01.927466-06	f	t
87	2	40	GT	0	S	2	32	1	2020-03-12 15:11:33.153208-06	2020-04-08 17:49:32.313412-06	f	t
86	1	40	GT	0	S	2	32	1	2020-03-12 15:11:32.737041-06	2020-04-08 18:21:40.809004-06	f	t
85	2	40	GT	0	S	1	32	1	2020-03-12 15:11:06.981206-06	2020-04-08 18:19:37.192921-06	f	t
95	2	40	GP	0	S	6	11	1	2020-03-12 16:46:06.868209-06	2020-04-08 17:36:05.436266-06	f	t
97	4	40	GP	0	S	6	25	1	2020-03-12 16:46:07.824448-06	2020-04-08 17:36:31.074001-06	f	t
106	1	40	GT	0	S	9	32	1	2020-03-12 17:01:07.769527-06	2020-04-08 18:42:19.528326-06	f	t
94	1	40	GP	0	S	6	4	1	2020-03-12 16:46:06.44139-06	2020-04-08 18:24:10.522456-06	f	t
99	1	40	GT	0	S	7	18	1	2020-03-12 16:56:55.388208-06	2020-04-08 17:39:23.749128-06	f	t
102	2	40	GP	0	S	8	8	1	2020-03-12 16:59:04.482488-06	2020-04-08 17:44:26.893072-06	f	t
104	4	40	GP	0	S	8	10	1	2020-03-12 16:59:05.238553-06	2020-04-08 17:44:55.481296-06	f	t
93	2	40	GT	0	S	5	32	1	2020-03-12 16:44:53.032362-06	2020-04-08 17:51:59.302941-06	f	t
88	1	40	GT	0	S	3	32	1	2020-03-12 15:11:57.958411-06	2020-04-08 17:52:37.367253-06	f	t
90	1	40	GT	0	S	4	8	1	2020-03-12 15:12:36.329821-06	2020-04-08 18:23:53.826318-06	f	t
92	1	40	GT	0	S	5	32	1	2020-03-12 16:44:52.802323-06	2020-04-08 17:56:45.612467-06	f	t
89	2	40	GT	0	S	3	32	1	2020-03-12 15:11:58.464361-06	2020-04-08 17:57:09.743816-06	f	t
105	5	40	GP	0	S	8	10	1	2020-03-12 16:59:05.689267-06	2020-04-08 17:57:34.874331-06	f	t
101	1	40	GP	0	S	8	8	1	2020-03-12 16:59:04.078529-06	2020-04-08 17:57:48.875568-06	f	t
98	5	40	GP	0	S	6	12	1	2020-03-12 16:46:08.361014-06	2020-04-08 18:13:52.231075-06	f	t
96	3	40	GP	0	S	6	9	1	2020-03-12 16:46:07.341899-06	2020-04-08 18:14:05.840386-06	f	t
103	3	40	GP	0	S	8	13	1	2020-03-12 16:59:04.825376-06	2020-04-08 18:22:07.238913-06	f	t
100	2	40	GT	0	S	7	12	1	2020-03-12 16:56:55.583952-06	2020-04-08 18:23:36.896061-06	f	t
91	2	40	GT	0	S	4	8	1	2020-03-12 15:12:36.733874-06	2020-04-08 18:24:22.937168-06	f	t
112	3	40	GP	0	S	11	23	1	2020-03-12 17:04:29.657263-06	2020-04-08 18:40:38.386731-06	f	t
114	2	40	GT	0	S	12	4	1	2020-03-12 17:05:08.549818-06	2020-04-08 18:26:59.038098-06	f	t
119	2	40	GP	0	S	13	26	1	2020-03-12 17:06:30.289384-06	2020-04-08 18:36:30.74403-06	f	t
116	2	40	GP	0	S	12	4	1	2020-03-12 17:05:09.569851-06	2020-04-08 18:27:28.855223-06	f	t
115	1	40	GP	0	S	12	4	1	2020-03-12 17:05:09.361024-06	2020-04-08 18:27:40.368557-06	f	t
108	1	40	GT	0	S	10	21	1	2020-03-12 17:01:43.685604-06	2020-04-08 18:31:57.525902-06	f	t
113	1	40	GT	0	S	12	4	1	2020-03-12 17:05:08.349453-06	2020-04-08 18:32:36.257939-06	f	t
121	1	40	GT	0	S	15	32	1	2020-03-12 17:09:07.698844-06	2020-04-08 18:37:54.973773-06	f	t
109	2	40	GT	0	S	10	12	1	2020-03-12 17:01:43.894508-06	2020-04-08 18:33:41.623078-06	f	t
117	3	40	GP	0	S	12	4	1	2020-03-12 17:05:09.777042-06	2020-04-08 18:35:20.34199-06	f	t
118	1	40	GP	0	S	13	10	1	2020-03-12 17:06:29.697199-06	2020-04-08 18:41:23.279083-06	f	t
123	1	40	GT	0	S	16	16	1	2020-03-12 17:11:03.009272-06	2020-04-08 18:41:37.279658-06	f	t
110	1	40	GP	0	S	11	21	1	2020-03-12 17:04:29.257156-06	2020-04-08 18:36:10.835-06	f	t
122	2	40	GT	0	S	15	32	1	2020-03-12 17:09:07.888144-06	2020-04-08 18:38:02.252215-06	f	t
157	1	40	GP	2	S	127	3	2	2020-03-12 18:30:42.561362-06	2020-03-12 18:30:52.293355-06	f	f
158	2	40	GP	2	S	127	13	2	2020-03-12 18:30:43.292692-06	2020-03-12 18:30:58.973004-06	f	f
159	3	40	GP	2	S	127	30	2	2020-03-12 18:30:44.269298-06	2020-03-12 18:31:06.458338-06	f	f
160	4	40	GP	2	S	127	8	2	2020-03-12 18:30:45.089087-06	2020-03-12 18:31:11.939021-06	f	f
107	2	40	GT	0	S	9	32	1	2020-03-12 17:01:08.067354-06	2020-04-08 18:42:23.646779-06	f	t
120	3	40	GP	0	S	13	24	1	2020-03-12 17:06:30.662689-06	2020-04-08 18:38:45.409418-06	f	t
162	2	40	GT	4	S	129	15	2	2020-03-12 18:33:12.536114-06	2020-03-12 18:33:26.101722-06	f	f
124	2	40	GT	0	S	16	16	1	2020-03-12 17:11:03.1941-06	2020-04-08 18:42:36.60613-06	f	t
111	2	40	GP	0	S	11	23	1	2020-03-12 17:04:29.459634-06	2020-04-08 18:42:06.668433-06	f	t
163	1	40	GT	4	S	124	32	2	2020-03-12 18:35:11.375835-06	2020-03-12 18:35:13.355648-06	f	f
164	2	40	GT	4	S	124	32	2	2020-03-12 18:35:11.858122-06	2020-03-12 18:35:14.674623-06	f	f
128	1	40	GT	0	S	20	10	1	2020-03-12 17:14:39.115558-06	2020-04-08 18:46:27.231975-06	f	t
135	1	40	GT	0	S	24	18	1	2020-03-12 17:18:45.228165-06	2020-04-08 18:53:58.720048-06	f	t
165	1	40	GT	4	S	125	32	2	2020-03-12 18:35:37.818316-06	2020-03-12 18:35:39.953418-06	f	f
166	2	40	GT	4	S	125	32	2	2020-03-12 18:35:38.435369-06	2020-03-12 18:35:41.281177-06	f	f
136	1	40	GP	0	S	24	18	1	2020-03-12 17:18:45.810311-06	2020-04-08 18:54:34.887996-06	f	t
133	1	40	GP	0	S	23	17	1	2020-03-12 17:17:31.232716-06	2020-04-08 18:53:27.271486-06	f	t
167	1	40	GT	2	S	126	32	2	2020-03-12 18:35:53.070861-06	2020-03-12 18:35:55.500416-06	f	f
168	2	40	GT	2	S	126	32	2	2020-03-12 18:35:53.444178-06	2020-03-12 18:35:56.767754-06	f	f
137	2	40	GP	0	S	24	18	1	2020-03-12 17:18:46.018689-06	2020-04-08 18:54:40.81699-06	f	t
156	1	40	GT	0	S	38	20	1	2020-03-12 17:48:55.397854-06	2020-04-08 19:59:48.180388-06	f	t
169	1	40	GT	4	S	128	32	2	2020-03-12 18:36:10.471674-06	2020-03-12 18:36:12.462639-06	f	f
170	2	40	GT	4	S	128	32	2	2020-03-12 18:36:10.769785-06	2020-03-12 18:36:13.540534-06	f	f
131	1	40	GP	0	S	22	17	1	2020-03-12 17:16:05.991445-06	2020-04-08 18:55:09.150502-06	f	t
127	2	40	GP	0	S	19	24	1	2020-03-12 17:13:40.580352-06	2020-04-08 19:02:29.852103-06	f	t
130	1	40	GT	0	S	22	2	1	2020-03-12 17:16:05.305114-06	2020-04-08 19:04:52.127569-06	f	t
172	2	40	GT	2	S	131	10	2	2020-03-12 18:37:34.38324-06	2020-03-12 18:39:02.883583-06	f	f
173	1	40	GP	2	S	131	18	2	2020-03-12 18:37:35.997473-06	2020-03-12 18:39:05.059633-06	f	f
132	2	40	GP	0	S	22	16	1	2020-03-12 17:16:06.218996-06	2020-04-08 19:11:10.645267-06	f	t
126	1	40	GP	0	S	19	24	1	2020-03-12 17:13:40.382606-06	2020-04-08 19:02:25.368962-06	f	t
129	1	40	GT	0	S	21	32	1	2020-03-12 17:15:05.549954-06	2020-04-08 19:19:42.437029-06	f	t
125	1	40	GT	0	S	17	32	1	2020-03-12 17:12:59.728538-06	2020-04-08 19:07:54.651607-06	f	t
134	2	40	GP	0	S	23	9	1	2020-03-12 17:17:31.519361-06	2020-04-08 19:10:56.521425-06	f	t
148	1	40	GP	0	S	32	7	1	2020-03-12 17:41:09.528383-06	2020-04-08 19:36:30.516938-06	f	t
146	1	40	GT	0	S	31	3	1	2020-03-12 17:40:37.839824-06	2020-04-08 19:54:53.179132-06	f	t
145	1	40	GT	0	S	30	32	1	2020-03-12 17:40:10.134895-06	2020-04-08 19:54:17.645967-06	f	t
139	1	40	GP	0	S	25	7	1	2020-03-12 17:35:10.77814-06	2020-04-08 19:51:46.794373-06	f	t
141	1	40	GT	0	S	26	20	1	2020-03-12 17:38:10.05589-06	2020-04-08 19:52:11.093514-06	f	t
147	1	40	GT	0	S	32	7	1	2020-03-12 17:41:08.950099-06	2020-04-08 19:52:23.55649-06	f	t
138	1	40	GT	0	S	25	7	1	2020-03-12 17:35:10.166684-06	2020-04-08 19:52:37.496177-06	f	t
149	2	40	GP	0	S	32	23	1	2020-03-12 17:41:25.060814-06	2020-04-08 19:52:53.068097-06	f	t
151	2	40	GP	0	S	33	25	1	2020-03-12 17:42:16.219065-06	2020-04-08 19:53:19.659866-06	f	t
143	2	40	GP	0	S	26	20	1	2020-03-12 17:38:10.78753-06	2020-04-08 19:53:34.175691-06	f	t
142	1	40	GP	0	S	26	20	1	2020-03-12 17:38:10.588868-06	2020-04-08 19:53:39.728108-06	f	t
144	1	40	GT	0	S	28	32	1	2020-03-12 17:39:44.989746-06	2020-04-08 19:53:59.73843-06	f	t
150	1	40	GP	0	S	33	5	1	2020-03-12 17:42:15.77417-06	2020-04-08 19:55:05.714284-06	f	t
153	2	40	GP	0	S	34	27	1	2020-03-12 17:44:40.387665-06	2020-04-08 19:57:56.326001-06	f	t
152	1	40	GP	0	S	34	2	1	2020-03-12 17:44:40.193678-06	2020-04-08 19:58:19.832845-06	f	t
154	1	40	GT	0	S	36	20	1	2020-03-12 17:47:36.306189-06	2020-04-08 19:59:07.557722-06	f	t
155	1	40	GT	0	S	37	9	1	2020-03-12 17:48:37.204092-06	2020-04-08 19:59:27.552747-06	f	t
161	1	40	GT	0	S	129	13	2	2020-03-12 18:33:11.752509-06	2020-04-27 20:33:25.097715-06	f	t
217	1	40	GT	2	S	146	20	2	2020-03-12 19:25:53.043134-06	2020-03-12 19:26:23.780528-06	f	f
218	1	40	GP	2	S	146	20	2	2020-03-12 19:25:53.510402-06	2020-03-12 19:26:26.314369-06	f	f
171	1	40	GT	2	S	131	10	2	2020-03-12 18:37:34.006861-06	2020-03-12 18:39:00.714783-06	f	f
174	2	40	GP	2	S	131	18	2	2020-03-12 18:37:36.403615-06	2020-03-12 18:39:07.407404-06	f	f
175	3	40	GP	2	S	131	18	2	2020-03-12 18:37:36.844521-06	2020-03-12 18:39:09.131804-06	f	f
219	1	40	GT	2	S	147	19	2	2020-03-12 19:26:50.780894-06	2020-03-12 19:26:53.264215-06	f	f
176	1	40	GT	4	S	132	23	2	2020-03-12 18:39:41.92827-06	2020-03-12 18:39:47.72586-06	f	f
177	2	40	GT	4	S	132	20	2	2020-03-12 18:39:42.140928-06	2020-03-12 18:40:16.210367-06	f	f
221	1	40	GT	4	S	148	20	2	2020-03-12 19:27:09.608952-06	2020-03-12 19:27:13.147818-06	f	f
178	1	40	GT	2	S	133	32	2	2020-03-12 18:40:20.670642-06	2020-03-12 18:40:22.598883-06	f	f
179	2	40	GT	2	S	133	32	2	2020-03-12 18:40:20.85265-06	2020-03-12 18:40:23.678372-06	f	f
222	1	40	GT	4	S	93	32	2	2020-03-12 19:28:32.70427-06	2020-03-12 19:28:34.723226-06	f	f
180	1	40	GT	4	S	137	32	2	2020-03-12 19:11:38.416257-06	2020-03-12 19:11:40.111673-06	f	f
181	2	40	GT	4	S	137	32	2	2020-03-12 19:11:38.608646-06	2020-03-12 19:11:41.34135-06	f	f
223	2	40	GT	4	S	93	32	2	2020-03-12 19:28:32.938222-06	2020-03-12 19:28:35.821601-06	f	f
182	1	40	GP	4	S	134	24	2	2020-03-12 19:12:11.282738-06	2020-03-12 19:15:11.609585-06	f	f
183	2	40	GP	4	S	134	33	2	2020-03-12 19:12:11.493084-06	2020-03-12 19:15:21.395334-06	f	f
224	1	40	GT	4	S	94	32	2	2020-03-12 19:28:55.245929-06	2020-03-12 19:28:56.911583-06	f	f
184	3	40	GP	4	S	134	22	2	2020-03-12 19:12:12.468382-06	2020-03-12 19:15:29.395106-06	f	f
225	2	40	GT	4	S	94	32	2	2020-03-12 19:28:55.502814-06	2020-03-12 19:28:58.506454-06	f	f
186	2	40	GT	2	S	135	2	2	2020-03-12 19:15:53.354359-06	2020-03-12 19:16:03.968588-06	f	f
226	1	40	GT	2	S	95	32	2	2020-03-12 19:29:37.759491-06	2020-03-12 19:29:39.236442-06	f	f
227	2	40	GT	2	S	95	32	2	2020-03-12 19:29:37.940753-06	2020-03-12 19:29:40.486498-06	f	f
185	1	40	GT	2	S	135	26	2	2020-03-12 19:15:53.161712-06	2020-03-12 19:16:38.867034-06	f	f
187	1	40	GP	4	S	135	12	2	2020-03-12 19:16:05.968837-06	2020-03-12 19:16:51.071675-06	f	f
188	2	40	GP	4	S	135	26	2	2020-03-12 19:16:06.153353-06	2020-03-12 19:16:54.91431-06	f	f
189	3	40	GP	4	S	135	26	2	2020-03-12 19:16:06.376997-06	2020-03-12 19:16:57.92474-06	f	f
190	1	40	GP	4	S	136	9	2	2020-03-12 19:17:41.789008-06	2020-03-12 19:17:53.614369-06	f	f
191	2	40	GP	4	S	136	23	2	2020-03-12 19:17:42.287352-06	2020-03-12 19:17:56.97697-06	f	f
228	1	40	GP	2	S	96	34	2	2020-03-12 19:30:40.949897-06	2020-03-12 19:31:17.796481-06	f	f
193	4	40	GP	4	S	136	24	2	2020-03-12 19:17:43.326311-06	2020-03-12 19:18:18.292678-06	f	f
192	3	40	GP	4	S	136	12	2	2020-03-12 19:17:42.790691-06	2020-03-12 19:18:34.481449-06	f	f
229	2	40	GP	2	S	96	27	2	2020-03-12 19:30:41.17674-06	2020-03-12 19:31:25.332759-06	f	f
230	3	40	GP	2	S	96	25	2	2020-03-12 19:30:41.426771-06	2020-03-12 19:31:26.752311-06	f	f
194	1	40	GT	2	S	138	18	2	2020-03-12 19:18:55.463919-06	2020-03-12 19:18:59.407917-06	f	f
195	1	40	GP	2	S	138	18	2	2020-03-12 19:18:55.946304-06	2020-03-12 19:19:01.692593-06	f	f
196	2	40	GP	2	S	138	18	2	2020-03-12 19:18:56.135678-06	2020-03-12 19:19:05.7214-06	f	f
231	4	40	GP	2	S	96	8	2	2020-03-12 19:30:41.698403-06	2020-03-12 19:31:34.168878-06	f	f
197	1	40	GT	2	S	139	19	2	2020-03-12 19:19:29.898721-06	2020-03-12 19:19:33.646716-06	f	f
198	1	40	GP	2	S	139	19	2	2020-03-12 19:19:30.36594-06	2020-03-12 19:19:35.746481-06	f	f
199	2	40	GP	2	S	139	4	2	2020-03-12 19:19:30.567088-06	2020-03-12 19:20:41.569923-06	f	f
232	1	40	GT	4	S	97	32	2	2020-03-12 19:32:14.321723-06	2020-03-12 19:32:16.066698-06	f	f
233	2	40	GT	4	S	97	32	2	2020-03-12 19:32:14.526264-06	2020-03-12 19:32:17.127453-06	f	f
201	1	40	GP	2	S	142	4	2	2020-03-12 19:21:01.223942-06	2020-03-12 19:21:07.907749-06	f	f
202	2	40	GP	2	S	142	28	2	2020-03-12 19:21:01.420221-06	2020-03-12 19:21:10.437153-06	f	f
200	1	40	GT	2	S	142	20	2	2020-03-12 19:21:00.700582-06	2020-03-12 19:21:36.309689-06	f	f
234	1	40	GT	4	S	98	15	2	2020-03-12 19:32:34.251723-06	2020-03-12 19:32:41.588341-06	f	f
235	2	40	GT	4	S	98	3	2	2020-03-12 19:32:34.46065-06	2020-03-12 19:32:44.687831-06	f	f
203	1	40	GP	4	S	143	4	2	2020-03-12 19:22:03.284748-06	2020-03-12 19:22:06.568125-06	f	f
204	2	40	GP	4	S	143	4	2	2020-03-12 19:22:03.47337-06	2020-03-12 19:22:09.329612-06	f	f
205	3	40	GP	4	S	143	16	2	2020-03-12 19:22:03.662031-06	2020-03-12 19:22:40.630476-06	f	f
206	1	40	GT	2	S	140	2	2	2020-03-12 19:23:01.979714-06	2020-03-12 19:23:55.193659-06	f	f
207	1	40	GP	2	S	140	11	2	2020-03-12 19:23:02.440254-06	2020-03-12 19:23:58.457456-06	f	f
208	2	40	GP	2	S	140	2	2	2020-03-12 19:23:02.649553-06	2020-03-12 19:24:00.858008-06	f	f
236	1	40	GT	2	S	100	23	2	2020-03-12 19:34:40.268331-06	2020-03-12 19:35:42.349377-06	f	f
209	1	40	GT	2	S	141	26	2	2020-03-12 19:24:15.534561-06	2020-03-12 19:24:24.698217-06	f	f
210	1	40	GP	2	S	141	26	2	2020-03-12 19:24:16.106742-06	2020-03-12 19:24:33.952177-06	f	f
211	2	40	GP	2	S	141	26	2	2020-03-12 19:24:16.307502-06	2020-03-12 19:24:38.66675-06	f	f
237	2	40	GT	2	S	100	10	2	2020-03-12 19:34:40.481921-06	2020-03-12 19:35:54.625453-06	f	f
212	1	40	GT	2	S	145	7	2	2020-03-12 19:25:05.085649-06	2020-03-12 19:25:07.721942-06	f	f
213	1	40	GP	2	S	145	7	2	2020-03-12 19:25:05.53584-06	2020-03-12 19:25:09.240174-06	f	f
238	1	40	GP	2	S	100	23	2	2020-03-12 19:34:41.21758-06	2020-03-12 19:35:57.550078-06	f	f
239	2	40	GP	2	S	100	23	2	2020-03-12 19:34:41.421613-06	2020-03-12 19:35:59.893041-06	f	f
244	2	40	GT	2	S	102	32	2	2020-03-12 19:37:27.24774-06	2020-03-12 19:37:29.692005-06	f	f
214	1	40	GP	4	S	149	16	2	2020-03-12 19:25:25.024526-06	2020-03-12 19:25:29.72469-06	f	f
215	2	40	GP	4	S	149	25	2	2020-03-12 19:25:25.238017-06	2020-03-12 19:25:31.884549-06	f	f
216	3	40	GP	4	S	149	25	2	2020-03-12 19:25:25.451594-06	2020-03-12 19:25:33.34921-06	f	f
240	3	40	GP	2	S	100	23	2	2020-03-12 19:34:41.622887-06	2020-03-12 19:36:02.927894-06	f	f
241	1	40	GT	4	S	101	5	2	2020-03-12 19:36:36.230565-06	2020-03-12 19:36:38.325674-06	f	f
242	2	40	GT	4	S	101	24	2	2020-03-12 19:36:36.413517-06	2020-03-12 19:36:40.804527-06	f	f
243	1	40	GT	2	S	102	32	2	2020-03-12 19:37:26.99056-06	2020-03-12 19:37:28.560906-06	f	f
245	1	40	GT	4	S	106	32	2	2020-03-12 19:37:57.654429-06	2020-03-12 19:37:59.515606-06	f	f
246	2	40	GT	4	S	106	32	2	2020-03-12 19:37:57.88171-06	2020-03-12 19:38:01.010192-06	f	f
247	1	40	GT	4	S	103	11	2	2020-03-12 19:38:14.028083-06	2020-03-12 19:38:34.7977-06	f	f
248	2	40	GT	4	S	103	23	2	2020-03-12 19:38:14.148067-06	2020-03-12 19:38:42.721274-06	f	f
249	1	40	GP	2	S	103	11	2	2020-03-12 19:38:15.411385-06	2020-03-12 19:38:48.956712-06	f	f
250	2	40	GP	2	S	103	11	2	2020-03-12 19:38:15.756565-06	2020-03-12 19:38:55.797092-06	f	f
251	3	40	GP	2	S	103	12	2	2020-03-12 19:38:16.189065-06	2020-03-12 19:39:13.431099-06	f	f
252	1	40	GP	2	S	104	9	2	2020-03-12 19:39:37.662798-06	2020-03-12 19:39:43.844147-06	f	f
253	2	40	GP	2	S	104	12	2	2020-03-12 19:39:37.848761-06	2020-03-12 19:40:00.809417-06	f	f
254	3	40	GP	2	S	104	25	2	2020-03-12 19:39:38.071532-06	2020-03-12 19:40:05.911029-06	f	f
255	4	40	GP	2	S	104	24	2	2020-03-12 19:39:38.289812-06	2020-03-12 19:40:11.366029-06	f	f
256	1	40	GT	2	S	107	14	2	2020-03-12 19:44:08.163832-06	2020-03-12 19:44:14.853978-06	f	f
257	1	40	GP	2	S	107	14	2	2020-03-12 19:44:08.611908-06	2020-03-12 19:44:16.829071-06	f	f
258	2	40	GP	2	S	107	19	2	2020-03-12 19:44:08.794707-06	2020-03-12 19:44:18.769027-06	f	f
259	1	40	GT	2	S	111	25	2	2020-03-12 19:44:51.111753-06	2020-03-12 19:44:54.104668-06	f	f
260	1	40	GP	2	S	111	28	2	2020-03-12 19:44:51.658856-06	2020-03-12 19:44:55.515698-06	f	f
261	2	40	GP	2	S	111	28	2	2020-03-12 19:44:51.872616-06	2020-03-12 19:44:56.913181-06	f	f
262	1	40	GP	2	S	113	14	2	2020-03-12 19:45:11.792212-06	2020-03-12 19:45:35.271855-06	f	f
263	2	40	GP	2	S	113	14	2	2020-03-12 19:45:11.993951-06	2020-03-12 19:45:38.638653-06	f	f
264	1	40	GP	2	S	108	22	2	2020-03-12 19:45:48.782435-06	2020-03-12 19:46:24.051212-06	f	f
265	2	40	GP	2	S	108	22	2	2020-03-12 19:45:49.49191-06	2020-03-12 19:46:25.862444-06	f	f
266	1	40	GT	2	S	109	7	2	2020-03-12 19:46:36.362315-06	2020-03-12 19:46:39.665285-06	f	f
267	1	40	GP	2	S	109	2	2	2020-03-12 19:46:36.860112-06	2020-03-12 19:46:42.023034-06	f	f
268	2	40	GP	2	S	109	2	2	2020-03-12 19:46:37.056374-06	2020-03-12 19:46:43.774279-06	f	f
269	1	40	GT	4	S	110	14	2	2020-03-12 19:46:55.36378-06	2020-03-12 19:46:58.784524-06	f	f
270	1	40	GT	2	S	116	7	2	2020-03-12 19:47:13.20815-06	2020-03-12 19:47:16.855371-06	f	f
271	1	40	GP	4	S	116	24	2	2020-03-12 19:47:14.019548-06	2020-03-12 19:47:43.141407-06	f	f
272	2	40	GP	4	S	116	24	2	2020-03-12 19:47:14.231992-06	2020-03-12 19:47:47.192508-06	f	f
273	1	40	GP	4	S	121	21	2	2020-03-12 19:48:02.880255-06	2020-03-12 19:48:10.97168-06	f	f
274	2	40	GP	4	S	121	16	2	2020-03-12 19:48:03.053348-06	2020-03-12 19:48:13.944222-06	f	f
275	3	40	GP	4	S	121	16	2	2020-03-12 19:48:03.243197-06	2020-03-12 19:48:16.103616-06	f	f
276	1	40	GT	2	S	122	6	2	2020-03-12 19:48:25.152661-06	2020-03-12 19:48:29.432865-06	f	f
277	1	40	GP	2	S	122	6	2	2020-03-12 19:48:26.09231-06	2020-03-12 19:48:30.96717-06	f	f
278	2	40	GP	2	S	122	6	2	2020-03-12 19:48:26.319703-06	2020-03-12 19:48:32.706927-06	f	f
279	1	40	GT	2	S	117	21	2	2020-03-12 19:48:45.120683-06	2020-03-12 19:48:47.850726-06	f	f
280	1	40	GP	2	S	117	21	2	2020-03-12 19:48:45.693385-06	2020-03-12 19:48:50.323355-06	f	f
281	2	40	GP	2	S	117	21	2	2020-03-12 19:48:45.834854-06	2020-03-12 19:48:53.106714-06	f	f
282	1	40	GT	2	S	118	3	2	2020-03-12 19:49:04.514224-06	2020-03-12 19:49:06.316084-06	f	f
284	1	40	GP	2	S	119	6	2	2020-03-12 19:49:23.795874-06	2020-03-12 19:49:29.869782-06	f	f
285	2	40	GP	2	S	119	6	2	2020-03-12 19:49:24.001427-06	2020-03-12 19:49:32.77152-06	f	f
283	1	40	GT	2	S	119	22	2	2020-03-12 19:49:23.329713-06	2020-03-12 19:49:52.300028-06	f	f
41	1	40	GP	0	S	50	11	1	2020-03-08 21:02:04.650717-06	2020-03-31 22:04:26.578217-06	f	t
286	2	40	GP	0	S	62	20	1	2020-03-31 23:03:11.687893-06	2020-03-31 23:03:47.342286-06	f	t
81	1	40	GT	0	S	73	19	1	2020-03-08 23:24:48.036272-06	2020-03-31 23:11:53.346101-06	f	t
140	2	40	GP	0	S	25	24	1	2020-03-12 17:35:10.988913-06	2020-04-08 19:55:11.268192-06	f	t
\.


--
-- TOC entry 3374 (class 0 OID 17037)
-- Dependencies: 239
-- Data for Name: horario_horario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.horario_horario (horario_id, horario_dia, horario_hora, horario_vacio, horario_aula_id, horario_grupo_id, created_at, updated_at) FROM stdin;
402	Martes	7	f	13	3	2020-03-30 11:37:50.654691-06	2020-03-30 11:37:50.654717-06
403	Jueves	7	f	13	3	2020-03-30 11:37:55.964651-06	2020-03-30 11:37:55.964701-06
404	Lunes	7	f	13	1	2020-03-30 11:38:17.14428-06	2020-03-30 11:38:17.144307-06
406	Viernes	7	f	13	2	2020-03-30 11:38:42.500612-06	2020-03-30 11:38:42.500641-06
407	Miercoles	7	f	13	1	2020-03-30 11:38:45.907685-06	2020-03-30 11:38:45.907713-06
408	Miercoles	9	f	13	2	2020-03-30 11:38:48.680304-06	2020-03-30 11:38:48.680344-06
409	Lunes	7	f	11	5	2020-03-30 11:39:24.895712-06	2020-03-30 11:39:24.895743-06
411	Martes	7	f	11	4	2020-03-30 11:39:47.947268-06	2020-03-30 11:39:47.947305-06
412	Jueves	7	f	11	5	2020-03-30 11:40:08.698488-06	2020-03-30 11:40:08.698526-06
413	Viernes	7	f	11	6	2020-03-30 11:40:15.127564-06	2020-03-30 11:40:15.127605-06
414	Miercoles	9	f	12	4	2020-03-30 11:40:52.380622-06	2020-03-30 11:40:52.380661-06
415	Miercoles	7	f	12	6	2020-03-30 11:41:21.927773-06	2020-03-30 11:41:21.927811-06
416	Martes	13	f	12	7	2020-03-30 11:45:36.068499-06	2020-03-30 11:45:36.068531-06
417	Miercoles	13	f	12	8	2020-03-30 11:45:51.266781-06	2020-03-30 11:45:51.266811-06
418	Jueves	11	f	12	9	2020-03-30 11:46:02.297087-06	2020-03-30 11:46:02.297128-06
419	Jueves	9	f	15	10	2020-03-30 11:47:13.908592-06	2020-03-30 11:47:13.908631-06
420	Miercoles	11	f	3	10	2020-03-30 11:49:01.826814-06	2020-03-30 11:49:01.826855-06
421	Viernes	11	f	3	12	2020-03-30 11:49:17.804522-06	2020-03-30 11:49:17.804567-06
422	Lunes	15	f	13	12	2020-03-30 11:49:52.107612-06	2020-03-30 11:49:52.107656-06
423	Martes	15	f	13	11	2020-03-30 11:50:33.483414-06	2020-03-30 11:50:33.483441-06
424	Viernes	13	f	3	11	2020-03-30 11:51:13.678173-06	2020-03-30 11:51:13.678215-06
425	Martes	13	f	13	14	2020-03-30 11:52:57.580148-06	2020-03-30 11:52:57.580175-06
426	Miercoles	13	f	13	15	2020-03-30 11:53:15.321906-06	2020-03-30 11:53:15.321934-06
427	Jueves	11	f	13	13	2020-03-30 11:53:32.100617-06	2020-03-30 11:53:32.100653-06
428	Lunes	9	f	14	21	2020-03-30 11:59:02.127232-06	2020-03-30 11:59:02.127269-06
429	Lunes	9	f	2	22	2020-03-30 11:59:19.659921-06	2020-03-30 11:59:19.659956-06
430	Lunes	13	f	2	20	2020-03-30 11:59:50.435021-06	2020-03-30 11:59:50.435056-06
431	Martes	11	f	2	16	2020-03-30 12:00:21.583578-06	2020-03-30 12:00:21.583619-06
432	Jueves	13	f	16	18	2020-03-31 20:53:09.601215-06	2020-03-31 20:53:09.601258-06
433	Jueves	13	f	2	19	2020-03-31 20:53:20.521996-06	2020-03-31 20:53:20.522023-06
434	Jueves	9	f	13	24	2020-03-31 21:36:30.098183-06	2020-03-31 21:36:30.098213-06
435	Miercoles	11	f	11	25	2020-03-31 21:37:12.231099-06	2020-03-31 21:37:12.231125-06
436	Lunes	15	f	11	24	2020-03-31 21:37:29.794125-06	2020-03-31 21:37:29.794163-06
437	Viernes	13	f	11	25	2020-03-31 21:37:53.857176-06	2020-03-31 21:37:53.857225-06
438	Viernes	11	f	15	23	2020-03-31 21:38:28.425381-06	2020-03-31 21:38:28.425419-06
440	Martes	15	f	15	23	2020-03-31 21:39:12.11995-06	2020-03-31 21:39:12.120007-06
441	Martes	9	f	16	31	2020-03-31 21:41:21.064275-06	2020-03-31 21:41:21.064303-06
442	Martes	9	f	1	29	2020-03-31 21:41:48.959339-06	2020-03-31 21:41:48.959382-06
443	Lunes	11	f	1	27	2020-03-31 21:42:23.23858-06	2020-03-31 21:42:23.238616-06
444	Viernes	15	f	1	28	2020-03-31 21:42:45.552711-06	2020-03-31 21:42:45.55274-06
445	Lunes	11	f	2	26	2020-03-31 21:43:05.554299-06	2020-03-31 21:43:05.554338-06
446	Viernes	15	f	8	30	2020-03-31 21:43:40.329849-06	2020-03-31 21:43:40.32995-06
447	Martes	9	f	11	33	2020-03-31 21:48:07.846675-06	2020-03-31 21:48:07.846719-06
448	Miercoles	9	f	11	32	2020-03-31 21:48:11.553176-06	2020-03-31 21:48:11.553209-06
449	Miercoles	7	f	11	33	2020-03-31 21:48:22.63045-06	2020-03-31 21:48:22.630479-06
450	Lunes	11	f	11	32	2020-03-31 21:48:36.726641-06	2020-03-31 21:48:36.726669-06
451	Jueves	7	f	7	35	2020-03-31 21:53:32.350794-06	2020-03-31 21:53:32.350824-06
453	Miercoles	7	f	3	34	2020-03-31 21:57:19.645254-06	2020-03-31 21:57:19.645291-06
454	Martes	9	f	3	34	2020-03-31 21:57:40.375722-06	2020-03-31 21:57:40.375761-06
455	Miercoles	11	f	7	35	2020-03-31 21:58:06.010206-06	2020-03-31 21:58:06.010246-06
456	Viernes	7	f	16	37	2020-03-31 21:59:59.973053-06	2020-03-31 21:59:59.973104-06
457	Jueves	11	f	16	38	2020-03-31 22:00:19.345759-06	2020-03-31 22:00:19.345803-06
458	Lunes	13	f	16	36	2020-03-31 22:00:52.734358-06	2020-03-31 22:00:52.734406-06
459	Martes	13	f	16	38	2020-03-31 22:01:09.873351-06	2020-03-31 22:01:09.873394-06
460	Viernes	15	f	2	37	2020-03-31 22:01:56.586341-06	2020-03-31 22:01:56.586381-06
461	Jueves	15	f	8	36	2020-03-31 22:02:14.487527-06	2020-03-31 22:02:14.487564-06
462	Lunes	7	f	7	40	2020-03-31 22:02:43.989246-06	2020-03-31 22:02:43.989274-06
463	Miercoles	13	f	7	39	2020-03-31 22:03:27.171233-06	2020-03-31 22:03:27.171276-06
464	Lunes	9	f	1	43	2020-03-31 22:03:54.825149-06	2020-03-31 22:03:54.825198-06
465	Viernes	9	f	1	42	2020-03-31 22:04:10.029318-06	2020-03-31 22:04:10.029371-06
466	Jueves	13	f	1	41	2020-03-31 22:04:26.249417-06	2020-03-31 22:04:26.24947-06
467	Martes	7	f	16	46	2020-03-31 22:30:54.072977-06	2020-03-31 22:30:54.073006-06
468	Viernes	11	f	16	45	2020-03-31 22:31:18.422634-06	2020-03-31 22:31:18.422663-06
469	Viernes	13	f	16	46	2020-03-31 22:31:29.675381-06	2020-03-31 22:31:29.675409-06
470	Miercoles	15	f	8	44	2020-03-31 22:32:04.930537-06	2020-03-31 22:32:04.930581-06
471	Martes	15	f	8	45	2020-03-31 22:32:14.625088-06	2020-03-31 22:32:14.625117-06
472	Lunes	15	f	16	44	2020-03-31 22:32:43.597957-06	2020-03-31 22:32:43.597995-06
473	Jueves	9	f	11	48	2020-03-31 22:33:25.712509-06	2020-03-31 22:33:25.712546-06
474	Martes	11	f	12	47	2020-03-31 22:34:24.383409-06	2020-03-31 22:34:24.383441-06
475	Martes	11	f	3	51	2020-03-31 22:36:18.923839-06	2020-03-31 22:36:18.923877-06
476	Jueves	9	f	3	50	2020-03-31 22:36:40.032202-06	2020-03-31 22:36:40.032602-06
477	Jueves	7	f	5	52	2020-03-31 22:50:13.225599-06	2020-03-31 22:50:13.225641-06
478	Miercoles	9	f	5	52	2020-03-31 22:50:16.449104-06	2020-03-31 22:50:16.449143-06
479	Miercoles	13	f	3	53	2020-03-31 22:50:45.630074-06	2020-03-31 22:50:45.630114-06
480	Lunes	15	f	14	56	2020-03-31 22:51:19.104392-06	2020-03-31 22:51:19.104421-06
481	Martes	13	f	14	55	2020-03-31 22:51:31.184856-06	2020-03-31 22:51:31.184883-06
482	Miercoles	15	f	14	54	2020-03-31 22:51:38.916093-06	2020-03-31 22:51:38.91612-06
483	Martes	7	f	3	57	2020-03-31 22:52:23.195089-06	2020-03-31 22:52:23.195118-06
484	Lunes	9	f	16	58	2020-03-31 22:52:37.521947-06	2020-03-31 22:52:37.521988-06
485	Martes	15	f	16	59	2020-03-31 22:53:05.325721-06	2020-03-31 22:53:05.325766-06
486	Jueves	15	f	16	59	2020-03-31 22:53:19.537175-06	2020-03-31 22:53:19.537202-06
487	Viernes	15	f	16	58	2020-03-31 22:53:25.236758-06	2020-03-31 22:53:25.236789-06
488	Lunes	11	f	3	60	2020-03-31 22:54:37.152506-06	2020-03-31 22:54:37.152572-06
489	Jueves	11	f	3	60	2020-03-31 22:56:32.714162-06	2020-03-31 22:56:32.714196-06
490	Martes	11	f	14	61	2020-03-31 22:57:44.387043-06	2020-03-31 22:57:44.38716-06
491	Viernes	11	f	14	62	2020-03-31 22:57:49.142363-06	2020-03-31 22:57:49.142394-06
492	Martes	9	f	5	63	2020-03-31 22:58:08.784509-06	2020-03-31 22:58:08.784537-06
493	Jueves	9	f	5	63	2020-03-31 22:58:21.421654-06	2020-03-31 22:58:21.421683-06
494	Viernes	9	f	6	64	2020-03-31 22:58:34.345168-06	2020-03-31 22:58:34.345207-06
495	Lunes	13	f	6	64	2020-03-31 22:58:51.998214-06	2020-03-31 22:58:51.998245-06
496	Miercoles	15	f	3	65	2020-03-31 23:01:28.65099-06	2020-03-31 23:01:28.651018-06
497	Lunes	11	f	14	67	2020-03-31 23:02:07.294048-06	2020-03-31 23:02:07.294088-06
498	Jueves	15	f	14	286	2020-03-31 23:03:47.022851-06	2020-03-31 23:03:47.022877-06
499	Lunes	7	f	5	68	2020-03-31 23:04:12.45704-06	2020-03-31 23:04:12.457078-06
500	Martes	11	f	5	68	2020-03-31 23:04:37.484416-06	2020-03-31 23:04:37.484454-06
501	Jueves	7	f	6	69	2020-03-31 23:04:54.074292-06	2020-03-31 23:04:54.074328-06
502	Viernes	7	f	8	71	2020-03-31 23:05:11.603678-06	2020-03-31 23:05:11.60372-06
503	Lunes	13	f	8	71	2020-03-31 23:05:29.090068-06	2020-03-31 23:05:29.090108-06
504	Jueves	13	f	8	70	2020-03-31 23:05:49.754296-06	2020-03-31 23:05:49.754334-06
505	Viernes	13	f	8	70	2020-03-31 23:05:51.604429-06	2020-03-31 23:05:51.60447-06
506	Lunes	9	f	6	72	2020-03-31 23:06:21.302136-06	2020-03-31 23:06:21.302175-06
507	Miercoles	9	f	14	73	2020-03-31 23:07:05.844879-06	2020-03-31 23:07:05.844904-06
508	Jueves	11	f	14	74	2020-03-31 23:07:17.478173-06	2020-03-31 23:07:17.478203-06
509	Viernes	9	f	2	77	2020-03-31 23:07:41.347961-06	2020-03-31 23:07:41.347993-06
510	Lunes	15	f	2	76	2020-03-31 23:07:52.749334-06	2020-03-31 23:07:52.749392-06
511	Martes	15	f	6	75	2020-03-31 23:08:09.729417-06	2020-03-31 23:08:09.729489-06
512	Martes	9	f	9	83	2020-03-31 23:10:20.328579-06	2020-03-31 23:10:20.328615-06
513	Lunes	9	f	9	82	2020-03-31 23:10:26.158068-06	2020-03-31 23:10:26.158105-06
514	Lunes	15	f	9	79	2020-03-31 23:10:52.792579-06	2020-03-31 23:10:52.792618-06
515	Martes	15	f	9	80	2020-03-31 23:11:10.012792-06	2020-03-31 23:11:10.012829-06
516	Lunes	11	f	6	78	2020-03-31 23:11:31.390607-06	2020-03-31 23:11:31.390648-06
517	Viernes	11	f	4	81	2020-03-31 23:11:51.334868-06	2020-03-31 23:11:51.334917-06
518	Viernes	13	f	4	81	2020-03-31 23:11:53.259531-06	2020-03-31 23:11:53.259574-06
519	Martes	7	f	14	95	2020-04-08 17:36:04.639573-06	2020-04-08 17:36:04.639602-06
520	Martes	7	f	8	97	2020-04-08 17:36:30.589808-06	2020-04-08 17:36:30.589849-06
521	Jueves	7	f	15	99	2020-04-08 17:37:06.969421-06	2020-04-08 17:37:06.969709-06
522	Lunes	9	f	13	84	2020-04-08 17:37:55.056617-06	2020-04-08 17:37:55.056646-06
523	Lunes	9	f	11	87	2020-04-08 17:38:10.255803-06	2020-04-08 17:38:10.255847-06
524	Martes	9	f	15	90	2020-04-08 17:38:54.516772-06	2020-04-08 17:38:54.516803-06
525	Miercoles	9	f	3	99	2020-04-08 17:39:23.371832-06	2020-04-08 17:39:23.371873-06
526	Miercoles	9	f	15	91	2020-04-08 17:42:42.88401-06	2020-04-08 17:42:42.884041-06
527	Jueves	9	f	16	102	2020-04-08 17:44:26.231152-06	2020-04-08 17:44:26.23119-06
528	Jueves	9	f	1	104	2020-04-08 17:44:55.133016-06	2020-04-08 17:44:55.133066-06
529	Viernes	9	f	13	87	2020-04-08 17:49:32.014234-06	2020-04-08 17:49:32.014279-06
531	Martes	11	f	11	86	2020-04-08 17:51:30.585965-06	2020-04-08 17:51:30.586006-06
532	Martes	11	f	13	85	2020-04-08 17:51:42.723818-06	2020-04-08 17:51:42.723852-06
533	Miercoles	11	f	13	93	2020-04-08 17:51:58.659261-06	2020-04-08 17:51:58.659299-06
534	Miercoles	11	f	12	88	2020-04-08 17:52:37.046909-06	2020-04-08 17:52:37.04695-06
535	Jueves	11	f	15	100	2020-04-08 17:52:58.277589-06	2020-04-08 17:52:58.277631-06
536	Lunes	13	f	13	92	2020-04-08 17:56:44.86091-06	2020-04-08 17:56:44.86095-06
537	Lunes	13	f	12	89	2020-04-08 17:57:09.415787-06	2020-04-08 17:57:09.41584-06
538	Martes	13	f	2	105	2020-04-08 17:57:34.463596-06	2020-04-08 17:57:34.463622-06
539	Martes	13	f	8	101	2020-04-08 17:57:48.429085-06	2020-04-08 17:57:48.429116-06
540	Miercoles	13	f	1	98	2020-04-08 18:13:51.844899-06	2020-04-08 18:13:51.844941-06
541	Miercoles	13	f	2	96	2020-04-08 18:14:05.330332-06	2020-04-08 18:14:05.330367-06
542	Jueves	13	f	13	85	2020-04-08 18:19:36.716974-06	2020-04-08 18:19:36.717014-06
543	Jueves	13	f	11	86	2020-04-08 18:21:40.390623-06	2020-04-08 18:21:40.39066-06
544	Viernes	13	f	2	103	2020-04-08 18:22:06.717342-06	2020-04-08 18:22:06.717375-06
545	Viernes	9	f	11	84	2020-04-08 18:23:01.511539-06	2020-04-08 18:23:01.511568-06
546	Lunes	15	f	3	100	2020-04-08 18:23:36.535237-06	2020-04-08 18:23:36.535264-06
547	Lunes	15	f	15	90	2020-04-08 18:23:53.514552-06	2020-04-08 18:23:53.514638-06
548	Miercoles	15	f	9	94	2020-04-08 18:24:10.261605-06	2020-04-08 18:24:10.261658-06
549	Viernes	15	f	15	91	2020-04-08 18:24:22.681914-06	2020-04-08 18:24:22.681942-06
550	Lunes	7	f	2	111	2020-04-08 18:25:56.397617-06	2020-04-08 18:25:56.39766-06
551	Lunes	7	f	8	120	2020-04-08 18:26:15.80991-06	2020-04-08 18:26:15.809963-06
552	Martes	7	f	7	114	2020-04-08 18:26:58.752423-06	2020-04-08 18:26:58.752465-06
553	Miercoles	7	f	6	108	2020-04-08 18:27:14.035512-06	2020-04-08 18:27:14.035541-06
554	Jueves	7	f	1	116	2020-04-08 18:27:28.431206-06	2020-04-08 18:27:28.431251-06
555	Viernes	7	f	1	115	2020-04-08 18:27:39.904546-06	2020-04-08 18:27:39.904574-06
556	Lunes	9	f	7	108	2020-04-08 18:31:57.386043-06	2020-04-08 18:31:57.386072-06
557	Martes	9	f	7	109	2020-04-08 18:32:25.735859-06	2020-04-08 18:32:25.735895-06
558	Miercoles	9	f	7	113	2020-04-08 18:32:35.883695-06	2020-04-08 18:32:35.88375-06
559	Jueves	9	f	8	119	2020-04-08 18:33:20.719486-06	2020-04-08 18:33:20.719529-06
560	Viernes	9	f	3	109	2020-04-08 18:33:41.20729-06	2020-04-08 18:33:41.207331-06
561	Lunes	11	f	8	110	2020-04-08 18:35:01.946882-06	2020-04-08 18:35:01.946915-06
562	Martes	11	f	1	117	2020-04-08 18:35:19.884589-06	2020-04-08 18:35:19.884621-06
563	Miercoles	11	f	2	112	2020-04-08 18:35:32.628014-06	2020-04-08 18:35:32.628049-06
564	Miercoles	11	f	8	118	2020-04-08 18:35:48.148529-06	2020-04-08 18:35:48.148561-06
565	Viernes	11	f	2	110	2020-04-08 18:36:10.470015-06	2020-04-08 18:36:10.470043-06
566	Viernes	11	f	8	119	2020-04-08 18:36:30.316332-06	2020-04-08 18:36:30.316375-06
567	Lunes	13	f	11	121	2020-04-08 18:37:54.235436-06	2020-04-08 18:37:54.235473-06
568	Martes	13	f	11	122	2020-04-08 18:38:01.523293-06	2020-04-08 18:38:01.523337-06
569	Viernes	13	f	13	106	2020-04-08 18:38:24.92431-06	2020-04-08 18:38:24.92435-06
570	Miercoles	13	f	8	120	2020-04-08 18:38:45.010791-06	2020-04-08 18:38:45.010826-06
571	Jueves	13	f	14	112	2020-04-08 18:40:38.087536-06	2020-04-08 18:40:38.087564-06
572	Lunes	15	f	8	118	2020-04-08 18:41:22.862692-06	2020-04-08 18:41:22.862738-06
573	Martes	15	f	3	123	2020-04-08 18:41:36.550343-06	2020-04-08 18:41:36.550371-06
574	Martes	15	f	11	107	2020-04-08 18:41:53.244089-06	2020-04-08 18:41:53.244114-06
575	Miercoles	15	f	2	111	2020-04-08 18:42:06.261136-06	2020-04-08 18:42:06.261179-06
576	Jueves	15	f	11	106	2020-04-08 18:42:19.023095-06	2020-04-08 18:42:19.023136-06
577	Viernes	15	f	11	107	2020-04-08 18:42:23.115017-06	2020-04-08 18:42:23.115044-06
578	Jueves	15	f	3	124	2020-04-08 18:42:35.786257-06	2020-04-08 18:42:35.786286-06
579	Lunes	7	f	3	128	2020-04-08 18:46:26.393328-06	2020-04-08 18:46:26.393375-06
580	Martes	7	f	2	133	2020-04-08 18:46:44.113945-06	2020-04-08 18:46:44.113991-06
581	Miercoles	7	f	15	135	2020-04-08 18:47:05.126502-06	2020-04-08 18:47:05.12654-06
582	Jueves	7	f	2	133	2020-04-08 18:53:26.881548-06	2020-04-08 18:53:26.881578-06
583	Viernes	7	f	15	135	2020-04-08 18:53:58.43298-06	2020-04-08 18:53:58.433013-06
584	Lunes	9	f	8	136	2020-04-08 18:54:34.036443-06	2020-04-08 18:54:34.036473-06
585	Martes	9	f	8	137	2020-04-08 18:54:39.977959-06	2020-04-08 18:54:39.978091-06
586	Miercoles	9	f	16	131	2020-04-08 18:54:58.325524-06	2020-04-08 18:54:58.325555-06
587	Viernes	9	f	16	131	2020-04-08 18:55:08.678413-06	2020-04-08 18:55:08.678443-06
588	Jueves	9	f	7	129	2020-04-08 18:55:26.140731-06	2020-04-08 18:55:26.140769-06
589	Lunes	11	f	9	126	2020-04-08 18:56:37.58986-06	2020-04-08 18:56:37.589905-06
590	Martes	11	f	9	127	2020-04-08 18:56:42.000028-06	2020-04-08 18:56:42.000064-06
591	Miercoles	11	f	5	125	2020-04-08 19:01:59.268849-06	2020-04-08 19:01:59.268895-06
592	Jueves	11	f	9	126	2020-04-08 19:02:25.105482-06	2020-04-08 19:02:25.105525-06
593	Viernes	11	f	9	127	2020-04-08 19:02:29.588875-06	2020-04-08 19:02:29.5889-06
594	Martes	13	f	3	130	2020-04-08 19:04:51.226599-06	2020-04-08 19:04:51.226634-06
595	Miercoles	13	f	14	132	2020-04-08 19:07:30.965172-06	2020-04-08 19:07:30.965233-06
596	Jueves	13	f	5	125	2020-04-08 19:07:54.359487-06	2020-04-08 19:07:54.359518-06
598	Martes	15	f	2	134	2020-04-08 19:10:51.388679-06	2020-04-08 19:10:51.388707-06
599	Jueves	15	f	2	134	2020-04-08 19:10:56.008825-06	2020-04-08 19:10:56.008853-06
600	Viernes	15	f	14	132	2020-04-08 19:11:10.334754-06	2020-04-08 19:11:10.334784-06
601	Lunes	7	f	9	151	2020-04-08 19:36:17.843397-06	2020-04-08 19:36:17.843435-06
602	Jueves	7	f	9	148	2020-04-08 19:36:30.038277-06	2020-04-08 19:36:30.038307-06
603	Martes	7	f	5	145	2020-04-08 19:51:22.651264-06	2020-04-08 19:51:22.651302-06
604	Miercoles	7	f	5	144	2020-04-08 19:51:29.786139-06	2020-04-08 19:51:29.786173-06
605	Viernes	7	f	9	139	2020-04-08 19:51:46.223338-06	2020-04-08 19:51:46.223367-06
606	Lunes	9	f	3	141	2020-04-08 19:52:10.110104-06	2020-04-08 19:52:10.110146-06
607	Martes	9	f	6	147	2020-04-08 19:52:23.144494-06	2020-04-08 19:52:23.144523-06
608	Miercoles	9	f	6	138	2020-04-08 19:52:37.1022-06	2020-04-08 19:52:37.102232-06
609	Jueves	9	f	9	149	2020-04-08 19:52:52.475766-06	2020-04-08 19:52:52.475802-06
610	Lunes	13	f	9	151	2020-04-08 19:53:19.271809-06	2020-04-08 19:53:19.271846-06
611	Martes	13	f	9	150	2020-04-08 19:53:26.916655-06	2020-04-08 19:53:26.916697-06
612	Miercoles	13	f	9	143	2020-04-08 19:53:33.413685-06	2020-04-08 19:53:33.413725-06
613	Jueves	13	f	9	142	2020-04-08 19:53:38.954137-06	2020-04-08 19:53:38.954165-06
614	Viernes	13	f	5	144	2020-04-08 19:53:59.486035-06	2020-04-08 19:53:59.486074-06
615	Lunes	15	f	5	145	2020-04-08 19:54:17.385201-06	2020-04-08 19:54:17.385246-06
616	Miercoles	15	f	6	146	2020-04-08 19:54:52.709291-06	2020-04-08 19:54:52.709329-06
617	Jueves	15	f	9	150	2020-04-08 19:55:05.238822-06	2020-04-08 19:55:05.238846-06
618	Viernes	15	f	9	140	2020-04-08 19:55:10.485814-06	2020-04-08 19:55:10.485857-06
619	Lunes	7	f	14	153	2020-04-08 19:57:50.257251-06	2020-04-08 19:57:50.257301-06
620	Miercoles	7	f	14	153	2020-04-08 19:57:55.935512-06	2020-04-08 19:57:55.935544-06
621	Jueves	7	f	14	152	2020-04-08 19:58:10.037522-06	2020-04-08 19:58:10.037566-06
622	Martes	9	f	14	152	2020-04-08 19:58:19.338408-06	2020-04-08 19:58:19.338444-06
623	Martes	7	f	6	154	2020-04-08 19:58:39.882943-06	2020-04-08 19:58:39.882983-06
624	Lunes	15	f	6	154	2020-04-08 19:59:07.257743-06	2020-04-08 19:59:07.25779-06
625	Viernes	7	f	4	155	2020-04-08 19:59:25.398578-06	2020-04-08 19:59:25.398619-06
626	Viernes	9	f	4	155	2020-04-08 19:59:27.447266-06	2020-04-08 19:59:27.447308-06
627	Martes	15	f	7	156	2020-04-08 19:59:47.71846-06	2020-04-08 19:59:47.718506-06
628	Lunes	7	f	5	161	2020-04-27 20:33:09.589837-06	2020-04-27 20:33:09.589909-06
629	Miercoles	7	f	5	161	2020-04-27 20:33:24.94795-06	2020-04-27 20:33:24.947993-06
\.


--
-- TOC entry 3359 (class 0 OID 16681)
-- Dependencies: 224
-- Data for Name: plan_de_estudio_plandeestudio; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_de_estudio_plandeestudio (pde_id, pde_nombre, pde_anyo, pde_carrera_id, created_at, updated_at) FROM stdin;
2	plan de estudio ISI 2011 (credito)	2011	2	2020-03-06 20:41:22.161698-06	2020-03-06 20:42:05.309479-06
1	plan de estudio IT 2011 (credito)	2011	1	2020-03-06 20:40:51.363964-06	2020-03-06 20:42:14.527409-06
3	Plan de estudio UA 2019	2019	3	2020-03-08 07:19:31.479001-06	2020-03-08 07:19:31.47904-06
4	Plan de estudio Servicio	2019	4	2020-03-08 07:20:08.6745-06	2020-03-08 07:20:08.674547-06
\.


--
-- TOC entry 3366 (class 0 OID 16810)
-- Dependencies: 231
-- Data for Name: planificacion_planificacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planificacion_planificacion (planificacion_id, planificacion_anyo_lectivo, planificacion_semestre, created_at, updated_at) FROM stdin;
1	2019	2	2020-03-08 10:43:35.346862-06	2020-03-08 10:43:35.346911-06
2	2020	1	2020-03-08 10:43:42.228967-06	2020-03-08 10:43:42.228999-06
\.


--
-- TOC entry 3352 (class 0 OID 16560)
-- Dependencies: 217
-- Data for Name: recintos_recinto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recintos_recinto (recinto_nombre, recinto_id, recinto_ubicacion, recinto_facultad_id, created_at, updated_at) FROM stdin;
CIDS	1	Leon	1	2020-03-06 17:52:05.782357-06	2020-03-06 17:52:05.782395-06
ATM	2	Leon	1	2020-03-06 17:52:14.214005-06	2020-03-06 17:52:14.214036-06
Basico	3	Leon	1	2020-03-06 17:52:38.240263-06	2020-03-06 17:52:38.240295-06
Jorge Arguello	4	Leon	1	2020-03-06 17:57:00.065214-06	2020-03-06 17:57:00.06524-06
Edificio Mariano Fiallos	5	Basico Leon	1	2020-03-19 11:27:39.076712-06	2020-03-19 11:27:39.076739-06
\.


--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 215
-- Name: area_area_area_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.area_area_area_id_seq', 23, true);


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 219
-- Name: aulas_aula_aula_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aulas_aula_aula_id_seq', 16, true);


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 202
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 204
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 200
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 84, true);


--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 208
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 206
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 1, true);


--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 210
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 223
-- Name: carreras_carrera_carrera_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carreras_carrera_carrera_id_seq', 4, true);


--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 226
-- Name: componentes_componente_componente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.componentes_componente_componente_id_seq', 150, true);


--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 227
-- Name: departamento_departamento_departamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departamento_departamento_departamento_id_seq', 1, true);


--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 212
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 389, true);


--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 198
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 21, true);


--
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 196
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 124, true);


--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 230
-- Name: docente_area_docentearea_da_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.docente_area_docentearea_da_id_seq', 340, true);


--
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 233
-- Name: docente_horas_docentehoras_dh_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.docente_horas_docentehoras_dh_id_seq', 62, true);


--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 234
-- Name: docentes_docente_docente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.docentes_docente_docente_id_seq', 34, true);


--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 235
-- Name: facultades_facultad_facultad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.facultades_facultad_facultad_id_seq', 1, true);


--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 238
-- Name: grupos_grupo_grupo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grupos_grupo_grupo_id_seq', 286, true);


--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 240
-- Name: horario_horario_horario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.horario_horario_horario_id_seq', 629, true);


--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 241
-- Name: plan_de_estudio_plandeestudio_pde_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plan_de_estudio_plandeestudio_pde_id_seq', 4, true);


--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 236
-- Name: planificacion_planificacion_planificacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.planificacion_planificacion_planificacion_id_seq', 2, true);


--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 242
-- Name: recintos_recinto_recinto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recintos_recinto_recinto_id_seq', 5, true);


--
-- TOC entry 3122 (class 2606 OID 16541)
-- Name: area_area area_area_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.area_area
    ADD CONSTRAINT area_area_pkey PRIMARY KEY (area_id);


--
-- TOC entry 3130 (class 2606 OID 16583)
-- Name: aulas_aula aulas_aula_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aulas_aula
    ADD CONSTRAINT aulas_aula_pkey PRIMARY KEY (aula_id);


--
-- TOC entry 3091 (class 2606 OID 16611)
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- TOC entry 3096 (class 2606 OID 16479)
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- TOC entry 3099 (class 2606 OID 16432)
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 3093 (class 2606 OID 16422)
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- TOC entry 3086 (class 2606 OID 16465)
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- TOC entry 3088 (class 2606 OID 16414)
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- TOC entry 3107 (class 2606 OID 16450)
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- TOC entry 3110 (class 2606 OID 16494)
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- TOC entry 3101 (class 2606 OID 16440)
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- TOC entry 3113 (class 2606 OID 16458)
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 3116 (class 2606 OID 16508)
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- TOC entry 3104 (class 2606 OID 16605)
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- TOC entry 3133 (class 2606 OID 16617)
-- Name: authtoken_token authtoken_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_pkey PRIMARY KEY (key);


--
-- TOC entry 3135 (class 2606 OID 16619)
-- Name: authtoken_token authtoken_token_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_key UNIQUE (user_id);


--
-- TOC entry 3141 (class 2606 OID 16654)
-- Name: carreras_carrera carreras_carrera_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carreras_carrera
    ADD CONSTRAINT carreras_carrera_pkey PRIMARY KEY (carrera_id);


--
-- TOC entry 3148 (class 2606 OID 16710)
-- Name: componentes_componente componentes_componente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.componentes_componente
    ADD CONSTRAINT componentes_componente_pkey PRIMARY KEY (componente_id);


--
-- TOC entry 3138 (class 2606 OID 16741)
-- Name: departamento_departamento departamento_departamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento_departamento
    ADD CONSTRAINT departamento_departamento_pkey PRIMARY KEY (departamento_id);


--
-- TOC entry 3119 (class 2606 OID 16522)
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- TOC entry 3081 (class 2606 OID 16406)
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- TOC entry 3083 (class 2606 OID 16404)
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- TOC entry 3079 (class 2606 OID 16396)
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3181 (class 2606 OID 17151)
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- TOC entry 3155 (class 2606 OID 16792)
-- Name: docente_area_docentearea docente_area_docentearea_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.docente_area_docentearea
    ADD CONSTRAINT docente_area_docentearea_pkey PRIMARY KEY (da_id);


--
-- TOC entry 3163 (class 2606 OID 16833)
-- Name: docente_horas_docentehoras docente_horas_docentehoras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.docente_horas_docentehoras
    ADD CONSTRAINT docente_horas_docentehoras_pkey PRIMARY KEY (dh_id);


--
-- TOC entry 3151 (class 2606 OID 16866)
-- Name: docentes_docente docentes_docente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.docentes_docente
    ADD CONSTRAINT docentes_docente_pkey PRIMARY KEY (docente_id);


--
-- TOC entry 3124 (class 2606 OID 16901)
-- Name: facultades_facultad facultades_facultad_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.facultades_facultad
    ADD CONSTRAINT facultades_facultad_pkey PRIMARY KEY (facultad_id);


--
-- TOC entry 3167 (class 2606 OID 17158)
-- Name: grupos_grupo grupos_grupo_grupo_numero_grupo_plani_626e6fb8_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grupos_grupo
    ADD CONSTRAINT grupos_grupo_grupo_numero_grupo_plani_626e6fb8_uniq UNIQUE (grupo_numero, grupo_planificacion_id, grupo_tipo, grupo_componente_id);


--
-- TOC entry 3170 (class 2606 OID 16979)
-- Name: grupos_grupo grupos_grupo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grupos_grupo
    ADD CONSTRAINT grupos_grupo_pkey PRIMARY KEY (grupo_id);


--
-- TOC entry 3173 (class 2606 OID 17066)
-- Name: horario_horario horario_horario_horario_dia_horario_hora_0163ea2e_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horario_horario
    ADD CONSTRAINT horario_horario_horario_dia_horario_hora_0163ea2e_uniq UNIQUE (horario_dia, horario_hora, horario_aula_id, horario_grupo_id);


--
-- TOC entry 3175 (class 2606 OID 17064)
-- Name: horario_horario horario_horario_horario_dia_horario_hora_b9e871f7_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horario_horario
    ADD CONSTRAINT horario_horario_horario_dia_horario_hora_b9e871f7_uniq UNIQUE (horario_dia, horario_hora, horario_grupo_id);


--
-- TOC entry 3178 (class 2606 OID 17055)
-- Name: horario_horario horario_horario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horario_horario
    ADD CONSTRAINT horario_horario_pkey PRIMARY KEY (horario_id);


--
-- TOC entry 3144 (class 2606 OID 17094)
-- Name: plan_de_estudio_plandeestudio plan_de_estudio_plandeestudio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_de_estudio_plandeestudio
    ADD CONSTRAINT plan_de_estudio_plandeestudio_pkey PRIMARY KEY (pde_id);


--
-- TOC entry 3157 (class 2606 OID 16952)
-- Name: planificacion_planificacion planificacion_planificac_planificacion_anyo_lecti_314d16f8_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificacion_planificacion
    ADD CONSTRAINT planificacion_planificac_planificacion_anyo_lecti_314d16f8_uniq UNIQUE (planificacion_anyo_lectivo, planificacion_semestre);


--
-- TOC entry 3159 (class 2606 OID 16927)
-- Name: planificacion_planificacion planificacion_planificacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planificacion_planificacion
    ADD CONSTRAINT planificacion_planificacion_pkey PRIMARY KEY (planificacion_id);


--
-- TOC entry 3126 (class 2606 OID 17122)
-- Name: recintos_recinto recintos_recinto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recintos_recinto
    ADD CONSTRAINT recintos_recinto_pkey PRIMARY KEY (recinto_id);


--
-- TOC entry 3128 (class 1259 OID 17126)
-- Name: aulas_aula_aula_recinto_id_8cf45db8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX aulas_aula_aula_recinto_id_8cf45db8 ON public.aulas_aula USING btree (aula_recinto_id);


--
-- TOC entry 3089 (class 1259 OID 16612)
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- TOC entry 3094 (class 1259 OID 16480)
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- TOC entry 3097 (class 1259 OID 16481)
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- TOC entry 3084 (class 1259 OID 16466)
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- TOC entry 3105 (class 1259 OID 16496)
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- TOC entry 3108 (class 1259 OID 16495)
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- TOC entry 3111 (class 1259 OID 16510)
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- TOC entry 3114 (class 1259 OID 16509)
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- TOC entry 3102 (class 1259 OID 16606)
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- TOC entry 3131 (class 1259 OID 16625)
-- Name: authtoken_token_key_10f0b77e_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX authtoken_token_key_10f0b77e_like ON public.authtoken_token USING btree (key varchar_pattern_ops);


--
-- TOC entry 3139 (class 1259 OID 16745)
-- Name: carreras_carrera_carrera_departamento_id_e5d6a587; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX carreras_carrera_carrera_departamento_id_e5d6a587 ON public.carreras_carrera USING btree (carrera_departamento_id);


--
-- TOC entry 3145 (class 1259 OID 16707)
-- Name: componentes_componente_componente_area_id_c25ef1a6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX componentes_componente_componente_area_id_c25ef1a6 ON public.componentes_componente USING btree (componente_area_id);


--
-- TOC entry 3146 (class 1259 OID 17098)
-- Name: componentes_componente_componente_pde_id_cd33411d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX componentes_componente_componente_pde_id_cd33411d ON public.componentes_componente USING btree (componente_pde_id);


--
-- TOC entry 3136 (class 1259 OID 16910)
-- Name: departamento_departamento_departamento_facultad_id_4a211a59; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX departamento_departamento_departamento_facultad_id_4a211a59 ON public.departamento_departamento USING btree (departamento_facultad_id);


--
-- TOC entry 3117 (class 1259 OID 16533)
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- TOC entry 3120 (class 1259 OID 16534)
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- TOC entry 3179 (class 1259 OID 17153)
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- TOC entry 3182 (class 1259 OID 17152)
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- TOC entry 3152 (class 1259 OID 16789)
-- Name: docente_area_docentearea_da_area_id_ee93a7bc; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX docente_area_docentearea_da_area_id_ee93a7bc ON public.docente_area_docentearea USING btree (da_area_id);


--
-- TOC entry 3153 (class 1259 OID 16870)
-- Name: docente_area_docentearea_da_docente_id_6b6c9f3e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX docente_area_docentearea_da_docente_id_6b6c9f3e ON public.docente_area_docentearea USING btree (da_docente_id);


--
-- TOC entry 3160 (class 1259 OID 16871)
-- Name: docente_horas_docentehoras_dh_docente_id_bfd52de8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX docente_horas_docentehoras_dh_docente_id_bfd52de8 ON public.docente_horas_docentehoras USING btree (dh_docente_id);


--
-- TOC entry 3161 (class 1259 OID 16931)
-- Name: docente_horas_docentehoras_dh_planificacion_id_ae1f0bdc; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX docente_horas_docentehoras_dh_planificacion_id_ae1f0bdc ON public.docente_horas_docentehoras USING btree (dh_planificacion_id);


--
-- TOC entry 3149 (class 1259 OID 16773)
-- Name: docentes_docente_docente_departamento_id_c68761f7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX docentes_docente_docente_departamento_id_c68761f7 ON public.docentes_docente USING btree (docente_departamento_id);


--
-- TOC entry 3164 (class 1259 OID 16975)
-- Name: grupos_grupo_grupo_componente_id_c13e6ba9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX grupos_grupo_grupo_componente_id_c13e6ba9 ON public.grupos_grupo USING btree (grupo_componente_id);


--
-- TOC entry 3165 (class 1259 OID 16976)
-- Name: grupos_grupo_grupo_docente_id_c71b2ef5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX grupos_grupo_grupo_docente_id_c71b2ef5 ON public.grupos_grupo USING btree (grupo_docente_id);


--
-- TOC entry 3168 (class 1259 OID 16977)
-- Name: grupos_grupo_grupo_planificacion_id_bcc1205e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX grupos_grupo_grupo_planificacion_id_bcc1205e ON public.grupos_grupo USING btree (grupo_planificacion_id);


--
-- TOC entry 3171 (class 1259 OID 17052)
-- Name: horario_horario_horario_aula_id_d5cfcde1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX horario_horario_horario_aula_id_d5cfcde1 ON public.horario_horario USING btree (horario_aula_id);


--
-- TOC entry 3176 (class 1259 OID 17053)
-- Name: horario_horario_horario_grupo_id_2a5b3aae; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX horario_horario_horario_grupo_id_2a5b3aae ON public.horario_horario USING btree (horario_grupo_id);


--
-- TOC entry 3142 (class 1259 OID 16691)
-- Name: plan_de_estudio_plandeestudio_pde_carrera_id_17a15b3d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX plan_de_estudio_plandeestudio_pde_carrera_id_17a15b3d ON public.plan_de_estudio_plandeestudio USING btree (pde_carrera_id);


--
-- TOC entry 3127 (class 1259 OID 16570)
-- Name: recintos_recinto_recinto_facultad_id_46ed571e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX recintos_recinto_recinto_facultad_id_46ed571e ON public.recintos_recinto USING btree (recinto_facultad_id);


--
-- TOC entry 3193 (class 2606 OID 17127)
-- Name: aulas_aula aulas_aula_aula_recinto_id_8cf45db8_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aulas_aula
    ADD CONSTRAINT aulas_aula_aula_recinto_id_8cf45db8_fk FOREIGN KEY (aula_recinto_id) REFERENCES public.recintos_recinto(recinto_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3185 (class 2606 OID 16473)
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3184 (class 2606 OID 16468)
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3183 (class 2606 OID 16459)
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3187 (class 2606 OID 16488)
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3186 (class 2606 OID 16483)
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3189 (class 2606 OID 16502)
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3188 (class 2606 OID 16497)
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3194 (class 2606 OID 16626)
-- Name: authtoken_token authtoken_token_user_id_35299eff_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_35299eff_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3196 (class 2606 OID 16746)
-- Name: carreras_carrera carreras_carrera_carrera_departamento_id_e5d6a587_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carreras_carrera
    ADD CONSTRAINT carreras_carrera_carrera_departamento_id_e5d6a587_fk FOREIGN KEY (carrera_departamento_id) REFERENCES public.departamento_departamento(departamento_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3198 (class 2606 OID 16697)
-- Name: componentes_componente componentes_componen_componente_area_id_c25ef1a6_fk_area_area; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.componentes_componente
    ADD CONSTRAINT componentes_componen_componente_area_id_c25ef1a6_fk_area_area FOREIGN KEY (componente_area_id) REFERENCES public.area_area(area_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3199 (class 2606 OID 17099)
-- Name: componentes_componente componentes_componente_componente_pde_id_cd33411d_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.componentes_componente
    ADD CONSTRAINT componentes_componente_componente_pde_id_cd33411d_fk FOREIGN KEY (componente_pde_id) REFERENCES public.plan_de_estudio_plandeestudio(pde_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3195 (class 2606 OID 16911)
-- Name: departamento_departamento departamento_departamento_departamento_facultad_id_4a211a59_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departamento_departamento
    ADD CONSTRAINT departamento_departamento_departamento_facultad_id_4a211a59_fk FOREIGN KEY (departamento_facultad_id) REFERENCES public.facultades_facultad(facultad_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3190 (class 2606 OID 16523)
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3191 (class 2606 OID 16528)
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3201 (class 2606 OID 16779)
-- Name: docente_area_docentearea docente_area_docente_da_area_id_ee93a7bc_fk_area_area; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.docente_area_docentearea
    ADD CONSTRAINT docente_area_docente_da_area_id_ee93a7bc_fk_area_area FOREIGN KEY (da_area_id) REFERENCES public.area_area(area_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3202 (class 2606 OID 16872)
-- Name: docente_area_docentearea docente_area_docentearea_da_docente_id_6b6c9f3e_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.docente_area_docentearea
    ADD CONSTRAINT docente_area_docentearea_da_docente_id_6b6c9f3e_fk FOREIGN KEY (da_docente_id) REFERENCES public.docentes_docente(docente_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3203 (class 2606 OID 16877)
-- Name: docente_horas_docentehoras docente_horas_docentehoras_dh_docente_id_bfd52de8_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.docente_horas_docentehoras
    ADD CONSTRAINT docente_horas_docentehoras_dh_docente_id_bfd52de8_fk FOREIGN KEY (dh_docente_id) REFERENCES public.docentes_docente(docente_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3204 (class 2606 OID 16932)
-- Name: docente_horas_docentehoras docente_horas_docentehoras_dh_planificacion_id_ae1f0bdc_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.docente_horas_docentehoras
    ADD CONSTRAINT docente_horas_docentehoras_dh_planificacion_id_ae1f0bdc_fk FOREIGN KEY (dh_planificacion_id) REFERENCES public.planificacion_planificacion(planificacion_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3200 (class 2606 OID 16768)
-- Name: docentes_docente docentes_docente_docente_departamento_c68761f7_fk_departame; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.docentes_docente
    ADD CONSTRAINT docentes_docente_docente_departamento_c68761f7_fk_departame FOREIGN KEY (docente_departamento_id) REFERENCES public.departamento_departamento(departamento_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3206 (class 2606 OID 17018)
-- Name: grupos_grupo grupos_grupo_grupo_componente_id_c13e6ba9_fk_component; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grupos_grupo
    ADD CONSTRAINT grupos_grupo_grupo_componente_id_c13e6ba9_fk_component FOREIGN KEY (grupo_componente_id) REFERENCES public.componentes_componente(componente_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3205 (class 2606 OID 16963)
-- Name: grupos_grupo grupos_grupo_grupo_docente_id_c71b2ef5_fk_docentes_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grupos_grupo
    ADD CONSTRAINT grupos_grupo_grupo_docente_id_c71b2ef5_fk_docentes_ FOREIGN KEY (grupo_docente_id) REFERENCES public.docentes_docente(docente_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3207 (class 2606 OID 17023)
-- Name: grupos_grupo grupos_grupo_grupo_planificacion__bcc1205e_fk_planifica; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grupos_grupo
    ADD CONSTRAINT grupos_grupo_grupo_planificacion__bcc1205e_fk_planifica FOREIGN KEY (grupo_planificacion_id) REFERENCES public.planificacion_planificacion(planificacion_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3208 (class 2606 OID 17042)
-- Name: horario_horario horario_horario_horario_aula_id_d5cfcde1_fk_aulas_aula_aula_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horario_horario
    ADD CONSTRAINT horario_horario_horario_aula_id_d5cfcde1_fk_aulas_aula_aula_id FOREIGN KEY (horario_aula_id) REFERENCES public.aulas_aula(aula_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3209 (class 2606 OID 17170)
-- Name: horario_horario horario_horario_horario_grupo_id_2a5b3aae_fk_grupos_gr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.horario_horario
    ADD CONSTRAINT horario_horario_horario_grupo_id_2a5b3aae_fk_grupos_gr FOREIGN KEY (horario_grupo_id) REFERENCES public.grupos_grupo(grupo_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3197 (class 2606 OID 17116)
-- Name: plan_de_estudio_plandeestudio plan_de_estudio_plan_pde_carrera_id_17a15b3d_fk_carreras_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_de_estudio_plandeestudio
    ADD CONSTRAINT plan_de_estudio_plan_pde_carrera_id_17a15b3d_fk_carreras_ FOREIGN KEY (pde_carrera_id) REFERENCES public.carreras_carrera(carrera_id) DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 3192 (class 2606 OID 16902)
-- Name: recintos_recinto recintos_recinto_recinto_facultad_id_46ed571e_fk_facultade; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recintos_recinto
    ADD CONSTRAINT recintos_recinto_recinto_facultad_id_46ed571e_fk_facultade FOREIGN KEY (recinto_facultad_id) REFERENCES public.facultades_facultad(facultad_id) DEFERRABLE INITIALLY DEFERRED;


-- Completed on 2020-06-10 14:10:19 CST

--
-- PostgreSQL database dump complete
--

