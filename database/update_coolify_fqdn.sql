UPDATE applications SET fqdn = 'https://base.kenakata.co' WHERE id = 23;
UPDATE applications SET fqdn = 'https://shop.kenakata.co' WHERE id = 24;
SELECT id, name, uuid, fqdn FROM applications WHERE id IN (22, 23, 24);
