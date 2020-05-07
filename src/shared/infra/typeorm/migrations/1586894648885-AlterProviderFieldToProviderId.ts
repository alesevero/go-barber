import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1586894648885
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointment', 'provider');
    await queryRunner.addColumn(
      'appointment',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointment',
      new TableForeignKey({
        name: 'appointment_provider_fk',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointment', 'appointment_provider_fk');
    await queryRunner.dropColumn('appointment', 'prodider_id');
    await queryRunner.addColumn(
      'appointment',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
