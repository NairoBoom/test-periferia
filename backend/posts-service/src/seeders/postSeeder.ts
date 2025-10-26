import { AppDataSource } from '../config/database';
import { Post } from '../entities/Post';
import axios from 'axios';

export const seedPosts = async (): Promise<void> => {
  try {
    const postRepository = AppDataSource.getRepository(Post);

    const existingPosts = await postRepository.count();

    if (existingPosts > 0) {
      console.log('Posts already seeded, skipping...');
      return;
    }

    const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

    await new Promise(resolve => setTimeout(resolve, 3000));

    const loginResponse = await axios.post(`${authServiceUrl}/api/auth/login`, {
      username: 'jperez',
      password: 'password123'
    });

    const token = loginResponse.data.token;

    const validateResponse = await axios.get(`${authServiceUrl}/api/auth/validate`, {
      headers: { authorization: `Bearer ${token}` }
    });

    const users = [validateResponse.data.user];

    const usernames = ['mgonzalez', 'crodriguez', 'lmartinez', 'dlopez'];

    for (const username of usernames) {
      const loginRes = await axios.post(`${authServiceUrl}/api/auth/login`, {
        username,
        password: 'password123'
      });

      const validationRes = await axios.get(`${authServiceUrl}/api/auth/validate`, {
        headers: { authorization: `Bearer ${loginRes.data.token}` }
      });

      users.push(validationRes.data.user);
    }

    const posts = [
      {
        message: 'Esta es mi primera publicación en la red social. Espero que les guste el contenido que estaré compartiendo.',
        userId: users[0].id
      },
      {
        message: 'Hoy fue un gran día. Aprendí muchas cosas nuevas sobre desarrollo de software y arquitecturas de microservicios.',
        userId: users[1].id
      },
      {
        message: 'Compartiendo algunos tips de programación que me han ayudado mucho en mis proyectos recientes.',
        userId: users[2].id
      },
      {
        message: 'El trabajo en equipo es fundamental para lograr grandes resultados. Agradecido con mi equipo de desarrollo.',
        userId: users[3].id
      },
      {
        message: 'Explorando nuevas tecnologías y frameworks. La industria del software siempre está en constante evolución.',
        userId: users[4].id
      }
    ];

    for (const postData of posts) {
      const post = postRepository.create(postData);
      await postRepository.save(post);
    }

    console.log('Posts seeded successfully');
  } catch (error) {
    console.error('Error seeding posts:', error);
  }
};
