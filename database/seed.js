/*eslint-env node */
import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.VITE_SUPERBASE_URL, process.env.SERVICE_ROLE_KEY)

const seedProjects = async () => {
  const name = faker.lorem.word(3)
  await supabase.from('projects').insert({
    name: name,
    slug: name.toLocaleLowerCase().replace(/ /g, '-'),
    status: faker.helpers.arrayElement(['in-progress', 'completed']),
    collabrators: faker.helpers.arrayElements([1, 2, 3, 4])
  })
}

await seedProjects()
