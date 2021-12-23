INSERT INTO item_category (categroy_name)
VALUES ('Custom');
INSERT INTO item (item_name, category_id)
VALUES (
        'Bread',
        (
            SELECT id
            FROM item_category
            WHERE categroy_name = 'Custom'
        )
    );
INSERT INTO shopping_list (shopping_list_name)
VALUES ('Bakery');
INSERT INTO item_shopping_list (
        item_id,
        shopping_list_id,
        additional_informations
    )
VALUES (
        (
            SELECT id
            FROM item
            WHERE item_name = 'Bread'
        ),
        (
            SELECT id
            FROM shopping_list
            WHERE shopping_list_name = 'Bakery'
        ),
        'White'
    );