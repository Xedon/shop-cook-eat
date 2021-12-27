
CREATE TABLE item_category(id UUID PRIMARY KEY DEFAULT gen_random_uuid(), category_name TEXT NOT NULL);

COMMENT ON COLUMN item_category.id IS '@omit create,update,delete,order';
COMMENT ON COLUMN item_category.category_name IS '@name name';

CREATE TABLE item (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES item_category
);

COMMENT ON COLUMN item.id IS '@omit create,update,delete,order';
COMMENT ON COLUMN item.item_name IS '@name name';

CREATE TABLE shopping_list(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopping_list_name TEXT NOT NULL UNIQUE
);

COMMENT ON COLUMN shopping_list.id IS '@omit create,update,delete,order';
COMMENT ON COLUMN shopping_list.shopping_list_name IS '@name name';

-- On changes on this table item_shopping_list_history, add_item_shopping_list_history_entry must be checked if changes are necessarys
CREATE TABLE item_shopping_list(
  item_id UUID NOT NULL REFERENCES item(id),
  shopping_list_id UUID NOT NULL REFERENCES shopping_list(id),
  additional_informations TEXT,
  PRIMARY KEY(item_id, shopping_list_id)
);

CREATE TABLE item_shopping_list_history(
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES item(id),
  shopping_list_id UUID NOT NULL REFERENCES shopping_list(id),
  additional_informations TEXT,
  PRIMARY KEY(id,item_id, shopping_list_id)
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