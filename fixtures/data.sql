INSERT INTO item_category (categroy_name)
VALUES ( 'TEST');
INSERT INTO item (item_name, category_id)
VALUES (
    'TEST',
    (SELECT id FROM item_category WHERE categroy_name='TEST')
);
INSERT INTO shopping_list (shopping_list_name)
VALUES (
    'TEST'
  );
  INSERT INTO item_shopping_list (
      item_id,
      shopping_list_id,
      additional_informations
    )
  VALUES (
       (SELECT item_id FROM item WHERE item_name='TEST'),
       (SELECT shopping_list_id FROM shopping_list WHERE shopping_list_name='TEST'),
      'TEST'
    );
    