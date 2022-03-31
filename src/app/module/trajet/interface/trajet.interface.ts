import { Location } from "../../map/interface/map.interface";
import { User } from "../../user/interface/user.interface";

export interface Trajet {
    trajetId:       string;
    creationDate:   Date;
    description:    string;
    price:          number;
    availableSits:  number;
    trajetDate:     string;
    dayFlexibility: number;
    driverUser:   User;
    passagers: User[];

    adresseStartId: string;
    adresseStart: Location;

    adresseEndId: string;
    adresseEnd: Location;
}