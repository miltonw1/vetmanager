import { CardBase } from '../common/CardBase';
import { Link } from 'react-router-dom';

export function MenuCard({ linkName, to }) {
    return (
        <CardBase>
            <Link to={to || "#"} >
                <p className="text-sm my-2 truncate  text-center">{linkName}</p>
            </Link>
        </CardBase>
    );
}