import { Component, ViewChild } from '@angular/core';
import { PeopleService } from 'src/app/people.service';
import { People } from 'src/app/shared/models/people.model';
import { DxDataGridComponent } from "devextreme-angular";
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  templateUrl: 'people.component.html',
})
export class PeopleComponent {

  //#region properties

  @ViewChild(DxDataGridComponent) peopleGrid!: DxDataGridComponent;

  public peopleDataSource: DataSource | null = null;

  //#endregion properties

  //#region init

  constructor(private PeopleService:PeopleService) {
    this.validateEmail = this.validateEmail.bind(this);
  }

  ngOnInit(): void {
    this.peopleDataSource = new DataSource({
      store: new CustomStore({
        load: async () => {
          return await this.PeopleService.getPeople();
        },
        remove: async (person: People) => {
          await this.PeopleService.deletePerson(person.peopleId);
        },
        update: async(key: People, values: People) => {
          const updated = { ...key, ... values };
          await this.PeopleService.updatePerson(key, updated);
        },
        insert: async(person: People) => {
          const inserted = await this.PeopleService.insertPerson(person)
          if (inserted)
            return inserted;
          else
            return Promise.resolve(person);
        }
      })
    });
  }

  //#endregion init

  //#region validation

  /**
   * Validator for email
   * @param e 
   * @returns 
   */
  public validateEmail(e: any) : boolean {
    const matches = this.peopleDataSource?.items().filter((x) => x.email === e.value && x.peopleId !== e.data.peopleId);
    return (matches?.length ?? 0) == 0 ;
  }

}
