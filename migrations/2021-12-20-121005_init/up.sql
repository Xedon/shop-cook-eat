
CREATE TABLE item_category(id SERIAL PRIMARY KEY, categroy_name TEXT NOT NULL);

CREATE TABLE item (
  item_id SERIAL PRIMARY KEY,
  item_name TEXT NOT NULL UNIQUE,
  category_id BIGINT REFERENCES item_category
);

COMMENT ON COLUMN item.item_name IS '@name name';

CREATE TABLE shopping_list(
  shopping_list_id SERIAL PRIMARY KEY,
  shopping_list_name TEXT NOT NULL UNIQUE
);

COMMENT ON COLUMN shopping_list.shopping_list_name IS '@name name';

-- On changes on this table item_shopping_list_history, add_item_shopping_list_history_entry must be checked if changes are necessarys
CREATE TABLE item_shopping_list(
  item_shopping_list_id SERIAL PRIMARY KEY,
  item_id BIGINT NOT NULL REFERENCES item,
  shopping_list_id BIGINT NOT NULL REFERENCES item_shopping_list,
  additional_informations TEXT
);

CREATE TABLE item_shopping_list_history(
  item_shopping_list_id SERIAL PRIMARY KEY,
  item_id BIGINT NOT NULL REFERENCES item,
  shopping_list_id BIGINT NOT NULL REFERENCES item_shopping_list,
  additional_informations TEXT,
  UNIQUE(item_id,shopping_list_id)
);

COMMENT ON TABLE item_shopping_list_history IS '@omit create,update,delete';

CREATE FUNCTION add_item_shopping_list_history_entry() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
IF
  NOT EXISTS(
    SELECT 1 FROM item_shopping_list_history WHERE 
    item_id=new.item_id AND shopping_list_id=new.shopping_list_id AND additional_informations=new.additional_informations
    ) THEN
   INSERT INTO item_shopping_list_history (item_id,shopping_list_id,additional_informations) VALUES (new.item_id,new.shopping_list_id,new.additional_informations);
   END IF;
   RETURN new;
END;
$$;

COMMENT ON FUNCTION add_item_shopping_list_history_entry IS '@omit';

CREATE TRIGGER item_shopping_list_history_historizer 
  AFTER INSERT ON item_shopping_list
  FOR EACH ROW 
EXECUTE PROCEDURE add_item_shopping_list_history_entry()