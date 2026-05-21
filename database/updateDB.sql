CREATE TABLE `descriptionpokemon` (
    `id_desc` bigint(4) NOT NULL PRIMARY KEY,
    `id_pok` bigint(4) NOT NULL,
    `description` VARCHAR(255)
);

ALTER TABLE descriptionpokemon
ADD CONSTRAINT fk_pok FOREIGN KEY (id_pok)  REFERENCES pokemon(id_pok);

INSERT INTO pokemon (id_pok,nom_pok) VALUES (151,'Mew');
INSERT INTO esttype (id_pok,type_pok) VALUES (151,'Psy');