import { PeopleTemplateEntity } from "../../entities"
import { GlobalRepository } from "../@shared/repository-global-interface"

export interface PeopleTemplateRepositoryInterface 
        extends GlobalRepository<PeopleTemplateEntity> {}