-- AlterTable
CREATE SEQUENCE categoria_id_seq;
ALTER TABLE "Categoria" ALTER COLUMN "id" SET DEFAULT nextval('categoria_id_seq');
ALTER SEQUENCE categoria_id_seq OWNED BY "Categoria"."id";

-- AlterTable
CREATE SEQUENCE produto_id_seq;
ALTER TABLE "Produto" ALTER COLUMN "id" SET DEFAULT nextval('produto_id_seq');
ALTER SEQUENCE produto_id_seq OWNED BY "Produto"."id";
