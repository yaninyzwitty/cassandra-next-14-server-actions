CREATE STREAM orders_enriched AS
SELECT
    O.*,
    I *,
    O.ORDERUNITS * I.ORDER_UNITS AS TOTAL_ORDERS
FROM
    ORDERS O
    LEFT OUTER JOIN ITEMS I ON O.ITEM_ID = I.ITEM_ID CREATE STREAM clickstream (
        user_id VARCHAR,
        page_id INT,
        timestamp BIGINT
    ) WITH (
        KAFKA_TOPIC = 'clickstream_topic',
        VALUE_FORMAT = 'JSON'
    );

-- join clickstream stream and orders
CREATE STREAM clickstream (
    user_id VARCHAR,
    page_id INT,
    timestamp BIGINT
) WITH (
    KAFKA_TOPIC = 'clickstream_topic',
    VALUE_FORMAT = 'JSON'
);

CREATE STREAM orders (
    order_id VARCHAR,
    user_id VARCHAR,
    total_amount DECIMAL,
    timestamp BIGINT
) WITH (
    KAFKA_TOPIC = 'orders_topic',
    VALUE_FORMAT = 'JSON'
);

CREATE STREAM clickstream_orders_enriched AS
SELECT
    c.*,
    o.*,
    c.page_id * o.total_amount AS total_page_ids
FROM
    clickstream c
    LEFT OUTER JOIN orders o ON c.user_id = o.user_id;