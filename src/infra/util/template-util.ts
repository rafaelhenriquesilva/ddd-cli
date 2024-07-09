import { PostgresColumnDTO } from "../../domain/@shared/dto/postgres-column-dto";

export class TemplateUtil {
    static filterColumnsToUpsert(columns: PostgresColumnDTO[]): PostgresColumnDTO[] {
        return columns.filter(column => column.columnDefault === null)
    }
}