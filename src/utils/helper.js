import Product from "@/data_model/models";
import slugify from "slugify";


function createSlug(text) {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export async function generateUniqueSlug(name) {
  let baseSlug = createSlug(name);
  let slug = baseSlug;
  let count = 1;

  while (await Product.exists({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}