import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { UserRole } from '../users/user-role.enum';

export async function seedAdmin(dataSource: DataSource) {
  const repo = dataSource.getRepository(User);

  const adminExists = await repo.findOne({
    where: { email: 'admin@email.com' },
  });

  if (!adminExists) {
    const admin = repo.create({
      email: 'admin@email.com',
      password: await bcrypt.hash('admin', 10),
      role: UserRole.ADMIN,
    });
    await repo.save(admin);
  }
}
