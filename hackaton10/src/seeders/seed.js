import { sequelize } from '../config/db.js';
import { Course, Lesson, User } from '../models/index.js';

async function main() {
  await sequelize.authenticate();
  const syncMode = process.env.DB_SYNC;
  await sequelize.sync({ force: syncMode === 'force', alter: syncMode === 'alter' });

  const [ada] = await User.findOrCreate({
    where: { email: 'ada@dev.io' },
    defaults: { firstName: 'Ada', lastName: 'Lovelace', passwordHash: 'x', role: 'instructor' },
  });
  const [linus] = await User.findOrCreate({
    where: { email: 'linus@dev.io' },
    defaults: { firstName: 'Linus', lastName: 'Torvalds', passwordHash: 'y', role: 'student' },
  });

  const [course] = await Course.findOrCreate({
    where: { slug: 'intro-a-node' },
    defaults: {
      title: 'Intro a Node',
      description: 'Curso base',
      published: true,
      ownerId: ada.id,
    },
  });

  await Lesson.findOrCreate({
    where: { slug: 'setup', courseId: course.id },
    defaults: {
      title: 'Setup',
      body: 'Contenido de setup...'.repeat(5),
      order: 1,
      courseId: course.id,
    },
  });
  await Lesson.findOrCreate({
    where: { slug: 'http', courseId: course.id },
    defaults: {
      title: 'HTTP',
      body: 'Contenido de HTTP...'.repeat(5),
      order: 2,
      courseId: course.id,
    },
  });

  console.log('Seed done');
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
