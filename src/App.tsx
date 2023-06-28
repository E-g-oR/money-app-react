import * as styles from "@styles/app.css.ts";
import {clsx} from "@utils/etc.ts";
import {lightScheme} from "@styles/colorScheme.css.ts";
import {themeClassName} from "@styles/theme.css.ts";
import AccountsPage from "@pages/accounts/AccountsPage.tsx";

function App() {


    return (
        <div className={clsx(themeClassName, lightScheme, styles.app)}>
            <AccountsPage/>
        </div>
    )
}

export default App
