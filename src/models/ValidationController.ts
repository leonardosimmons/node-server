
import { Combinable } from '../utils/types';
import { preg_match } from '../helpers/functions';

class ValidationController 
{
  private _validated: boolean;
  private _error: string;

  constructor() {
    this._validated = false;
    this._error = '';
  };

  get isValidated() {
    return this._validated;
  }

  get error() {
    return this._error;
  }

  // Controllers
  private validate(): void {
    this._validated = true;
  };
  
  public length(field: string, len: number): boolean {
    return field.length > len ? true : false;
  }

  public check(a = '', b = '', c = '', d = '', e = '', f = '', g = '', h = '', i = ''): string {
    let fail: string = '';
    const checkArr: string[] = [ a, b , c ,d ,e , f, g, h, i ];

    checkArr.forEach(check => {
      if (check !== '') {
        if (fail !== '') {
          fail = fail.concat(' | ').concat(check as string);
        } else {
            fail = check;
        }

        if (fail.match(/\s\|\s.*\s\|\s/)) {
          fail = fail.replace(' | ', '');
        }
      }
    });

    return fail;
  };

  public newPost(title: string, content: string): void {
    const t: string = this.title(title, 5);
    const c: string = this.content(content, 5);

    const validationCheck: string = this.check(t, c);

    if (validationCheck === '') {
      this.validate();
      console.log('[new post] Post created successfully');
      return;
    } 

    console.log('\x1b[31m%s\x1b[0m', `[new post] ${validationCheck}`);
    this._error = validationCheck;
    return;
  };

  public newUserForm(fn: string, ln: string, un: string, pw: string, a: Combinable, e: string): string | true {
    let fail = '';
    fail = fail.concat(this.firstName(fn));
    fail = fail.concat(this.lastName(ln));
    fail = fail.concat(this.userName(un));
    fail = fail.concat(this.password(pw));
    fail = fail.concat(this.age(a));
    fail = fail.concat(this.email(e));

    if (fail === '') return true;

    return fail;
  }; 

  public signInForm(un: string, pw: string) {
    let fail = '';
    fail = this.userName(un);
    fail = this.password(pw);

    if (fail === '') return true;

    return fail;
  }

  // Functions
  private title(field: string, len: number): string {
    let fail = '';
    if (field === '') { fail = 'No title was entered'; }
    if (!this.length(field, len)) { fail = fail + 'Title must be at least (5) characters long'; }

    return fail;
  };

  private content(field: string, len: number): string {
    let fail = '';
    if (field === '') { fail = 'No contetn was entered'; }
    if (!this.length(field, len)) { fail = fail + 'Content must be at least (5) characters long'; }

    return fail;
  };

  private firstName(field: string): string {
    return field === '' ? 'No First Name was entered | ': '';
  };

  private lastName(field: string): string {
    return field === '' ? 'No Last Name was entered | ': '';
  };

  private userName(field: string) {
    if (field === '') return 'No Username entered. | ';
    else if (field.length < 5) return 'Usename must be at least 5 characters long. | ';
    else if (preg_match('\W', field)) return 'Username must only contain letters, numbers, _ and -. | ';
    
    return '';
  };

  private password(field: string) {
    if (field === '') return 'No Password entered | ';
    else if (field.length < 6) return 'Password must be at least 6 characters long | ';
    else if (!preg_match('[a-z]', field) || !preg_match('[A-Z]', field ) || !preg_match('[0-9]', field)) 
      return 'Passwords require at least (1) uppercase letter, (1) lowercase letter and (1) number | ';
    
    return '';
  };

  private age(field: Combinable) {
    if (field === '' || field === 0) return 'No Age was entered | ';
    else if (typeof field === 'string') {
      if (parseInt(field) < 21) {
        return 'You must be at least 21 years of age to enter | ';
      }
    }
    else if (field < 21) return 'You must be at least 21 years of age to enter | ';

    return '';
  }
  
  private email(field: string) {
    if (field === '') return 'No Email address was entered | ';
    else if (!(field.indexOf('.') > 0 || field.indexOf('@') > 0) && preg_match('[^a-zA-z0-9_-]', field)) 
      return 'The entered email address is invalid | ';

    return '';
  }
};

export { ValidationController };