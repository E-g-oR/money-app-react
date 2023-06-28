import * as styles from "@styles/app.css.ts";
import {clsx} from "@utils/etc.ts";
import {lightScheme} from "@styles/colorScheme.css.ts";
import {themeClassName} from "@styles/theme.css.ts";

function App() {


    return (
        <div className={clsx(themeClassName, lightScheme, styles.app)}>
            App
        </div>
    )
}

export default App
