SELECT id_category, category, date_created, date_updated
FROM public.td_category;

INSERT INTO public.td_category (category, date_created)
VALUES ('Wishlist', NOW());

SELECT count(*) AS total
FROM public.td_category
WHERE id_category = 11;

UPDATE public.td_category 
SET category = 'Edit Category', date_updated = NOW()
WHERE id_category = 11;

DELETE FROM public.td_category WHERE id_category = 11;