import bcrypt from 'bcryptjs';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';

export const seedUsers = async (): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const existingUsers = await userRepository.count();

  if (existingUsers > 0) {
    console.log('Users already seeded, skipping...');
    return;
  }

  const users = [
    {
      username: 'jperez',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Juan',
      lastName: 'Perez',
      alias: 'juanito',
      birthDate: new Date('1995-03-15')
    },
    {
      username: 'mgonzalez',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Maria',
      lastName: 'González',
      alias: 'mary',
      birthDate: new Date('1998-07-22')
    },
    {
      username: 'crodriguez',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Carlos',
      lastName: 'Rodriguez',
      alias: 'carlitos',
      birthDate: new Date('1992-11-08')
    },
    {
      username: 'lmartinez',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Laura',
      lastName: 'Martinez',
      alias: 'lau',
      birthDate: new Date('1997-05-30')
    },
    {
      username: 'dlopez',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Diego',
      lastName: 'Lopez',
      alias: 'diegol',
      birthDate: new Date('1994-09-12')
    }
  ];

  for (const userData of users) {
    const user = userRepository.create(userData);
    await userRepository.save(user);
  }

  console.log('Users seeded successfully');
};
