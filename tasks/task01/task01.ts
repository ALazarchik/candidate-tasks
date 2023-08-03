class AuthenticationService {
    //in real project this method should send API request to /login endpoint and validate received response against its status code
    authenticate(username: string, password: string): boolean {     
        return username === 'admin' && password === 'qwerty';
    }
}

const authenticationService = new AuthenticationService();

class LoginPage {
    login(username: string, password: string, authService: AuthenticationService): boolean {
        // Call the authentication service to check the credentials
        return authService.authenticate(username, password);
    }
}

const loginPage = new LoginPage();

describe('Login tests', () => {
    // positive test case: login is successful after valid credentials are passed
    it('should pass with valid credentials: "admin" as username and "qwerty" as password', () => {    
        const isLoginSuccessful = loginPage.login('admin', 'qwerty', authenticationService);
        expect(isLoginSuccessful).to.be.true;
    });
    
    // negative test cases: login is not successful after different combinations of invalid credentials are passed
    [
        {username: 'qwerty', password: 'admin'},                    
        {username: 'random string', password: 'random string'},
        {username: 'random string', password: 'qwerty'},
        {username: 'admin', password: 'random string'},
        {username: 'admin', password: ''},
        {username: '', password: 'qwerty'},
        {username: '', password: ''},
        {username: undefined, password: 'qwerty'},
        {username: 'admin', password: undefined},
        {username: undefined, password: undefined},
        {username: null, password: 'qwerty'},
        {username: 'admin', password: null},
        {username: null, password: null},
    ].forEach(credentials => {
        it(`should fail with invalid credentials: "${credentials.username}" as username and "${credentials.password}" as password`, () => {
            const isLoginSuccessful = loginPage.login(credentials.username, credentials.password, authenticationService);
            expect(isLoginSuccessful).to.be.false;
        });
    });
});
