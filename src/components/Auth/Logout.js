
import { useHistory } from 'react-router-dom';

export default function Logout() {
    const history = useHistory();
    localStorage.removeItem('user');
    history.push('/login');
    window.location.reload();

    return (
        <button type="button" >
          Go home
        </button>
      );
};