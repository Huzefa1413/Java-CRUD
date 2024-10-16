import { Department } from './department'; // Adjust the import path as necessary
import { Location } from './location';

export class Employee {
  id: number = 0;
  firstName: string | undefined;
  lastName: string | undefined;
  gender: string | undefined;
  age: number | undefined;
  doj: Date | undefined;
  designation: string | undefined;
  department: Department | undefined;
  location: Location | undefined;
}
