import { ValidRoles } from "src/auth/interface/valid-roles";

interface SeedVehicle {
    model: string;
    brand: string;
    color: string;
    chassis: string;
    images: string[];
}

interface SeedUser {
    email: string
    password: string
    fullName: string
    roles: string[]
}

interface SeedQuestion {
    questionText: string
}

interface SeedData {
    users: SeedUser[];
    vehicles: SeedVehicle[];
    questions: SeedQuestion[];
}

function generateUniqueChassisCode() {
    const prefix = Math.random() < 0.5 ? "Scp" : "Nsp"; // Alterna entre 'Scp' y 'Nsp'
    const middle = Math.random() < 0.5 ? "-" : "";      // Aleatoriamente incluye o no un guion
    const randomNumber = Math.floor(Math.random() * 1000000000); // Genera un número aleatorio

    return `${prefix}${middle}${randomNumber}`;
}

export const initialData: SeedData = {
    users: [
        {
            email: 'adriansupersu@google.com',
            fullName: 'Adrian Rojas',
            password: 'secretpassupersu@SU12',
            roles: [ValidRoles.superUser]
        },
        {
            email: 'admin@google.com',
            fullName: 'Admin User',
            password: 'S3cretpasss#',
            roles: [ValidRoles.admin]
        },
        {
            email: 'user_one@google.com',
            fullName: 'User Test',
            password: 'S3cretpa#ss',
            roles: [ValidRoles.user, ValidRoles.admin]
        },
        {
            email: 'user_two@google.com',
            fullName: 'User Test 2',
            password: 'S3cretpa#ss',
            roles: [ValidRoles.user]
        }
    ],
    vehicles: [
        { model: "Model S", brand: "Tesla", color: "Red", chassis: generateUniqueChassisCode(), images: ['tesla-s-1.jpg', 'tesla-s-2.jpg'] },
        { model: "Civic", brand: "Honda", color: "White", chassis: generateUniqueChassisCode(), images: ['civic-1.jpg', 'civic-2.jpg'] },
        { model: "3 Series", brand: "BMW", color: "Black", chassis: generateUniqueChassisCode(), images: ['bmw-3-1.jpg', 'bmw-3-2.jpg'] },
        { model: "Corolla", brand: "Toyota", color: "Silver", chassis: generateUniqueChassisCode(), images: ['corolla-1.jpg', 'corolla-2.jpg'] },
        { model: "Mustang", brand: "Ford", color: "Blue", chassis: generateUniqueChassisCode(), images: ['mustang-1.jpg', 'mustang-2.jpg'] },
        { model: "Cherokee", brand: "Jeep", color: "Grey", chassis: generateUniqueChassisCode(), images: ['cherokee-1.jpg', 'cherokee-2.jpg'] },
        { model: "A4", brand: "Audi", color: "White", chassis: generateUniqueChassisCode(), images: ['audi-a4-1.jpg', 'audi-a4-2.jpg'] },
        { model: "Camry", brand: "Toyota", color: "Black", chassis: generateUniqueChassisCode(), images: ['camry-1.jpg', 'camry-2.jpg'] },
        { model: "Accord", brand: "Honda", color: "Red", chassis: generateUniqueChassisCode(), images: ['accord-1.jpg', 'accord-2.jpg'] },
        { model: "X5", brand: "BMW", color: "Blue", chassis: generateUniqueChassisCode(), images: ['bmw-x5-1.jpg', 'bmw-x5-2.jpg'] },
        { model: "F-150", brand: "Ford", color: "White", chassis: generateUniqueChassisCode(), images: ['f-150-1.jpg', 'f-150-2.jpg'] },
        { model: "Silverado", brand: "Chevrolet", color: "Black", chassis: generateUniqueChassisCode(), images: ['silverado-1.jpg', 'silverado-2.jpg'] },
        { model: "Model X", brand: "Tesla", color: "Silver", chassis: generateUniqueChassisCode(), images: ['tesla-x-1.jpg', 'tesla-x-2.jpg'] },
        { model: "Q7", brand: "Audi", color: "Grey", chassis: generateUniqueChassisCode(), images: ['audi-q7-1.jpg', 'audi-q7-2.jpg'] },
        { model: "Sorento", brand: "Kia", color: "Red", chassis: generateUniqueChassisCode(), images: ['sorento-1.jpg', 'sorento-2.jpg'] },
        { model: "Santa Fe", brand: "Hyundai", color: "Blue", chassis: generateUniqueChassisCode(), images: ['santa-fe-1.jpg', 'santa-fe-2.jpg'] },
        { model: "Tucson", brand: "Hyundai", color: "White", chassis: generateUniqueChassisCode(), images: ['tucson-1.jpg', 'tucson-2.jpg'] },
        { model: "CX-5", brand: "Mazda", color: "Red", chassis: generateUniqueChassisCode(), images: ['cx-5-1.jpg', 'cx-5-2.jpg'] },
        { model: "Forester", brand: "Subaru", color: "Green", chassis: generateUniqueChassisCode(), images: ['forester-1.jpg', 'forester-2.jpg'] },
        { model: "Outback", brand: "Subaru", color: "Blue", chassis: generateUniqueChassisCode(), images: ['outback-1.jpg', 'outback-2.jpg'] },
        { model: "Explorer", brand: "Ford", color: "Black", chassis: generateUniqueChassisCode(), images: ['explorer-1.jpg', 'explorer-2.jpg'] },
        { model: "Pilot", brand: "Honda", color: "Silver", chassis: generateUniqueChassisCode(), images: ['pilot-1.jpg', 'pilot-2.jpg'] },
        { model: "Highlander", brand: "Toyota", color: "Grey", chassis: generateUniqueChassisCode(), images: ['highlander-1.jpg', 'highlander-2.jpg'] },
        { model: "Grand Cherokee", brand: "Jeep", color: "Red", chassis: generateUniqueChassisCode(), images: ['grand-cherokee-1.jpg', 'grand-cherokee-2.jpg'] },
        { model: "Tahoe", brand: "Chevrolet", color: "Black", chassis: generateUniqueChassisCode(), images: ['tahoe-1.jpg', 'tahoe-2.jpg'] },
        { model: "Escalade", brand: "Cadillac", color: "White", chassis: generateUniqueChassisCode(), images: ['escalade-1.jpg', 'escalade-2.jpg'] },
        { model: "Yukon", brand: "GMC", color: "Black", chassis: generateUniqueChassisCode(), images: ['yukon-1.jpg', 'yukon-2.jpg'] },
        { model: "Range Rover", brand: "Land Rover", color: "Blue", chassis: generateUniqueChassisCode(), images: ['range-rover-1.jpg', 'range-rover-2.jpg'] },
        { model: "Wrangler", brand: "Jeep", color: "Green", chassis: generateUniqueChassisCode(), images: ['wrangler-1.jpg', 'wrangler-2.jpg'] },
        { model: "G-Class", brand: "Mercedes-Benz", color: "Grey", chassis: generateUniqueChassisCode(), images: ['g-class-1.jpg', 'g-class-2.jpg'] },
        { model: "Macan", brand: "Porsche", color: "Red", chassis: generateUniqueChassisCode(), images: ['macan-1.jpg', 'macan-2.jpg'] },
        { model: "Q5", brand: "Audi", color: "Blue", chassis: generateUniqueChassisCode(), images: ['audi-q5-1.jpg', 'audi-q5-2.jpg'] },
        { model: "X3", brand: "BMW", color: "Black", chassis: generateUniqueChassisCode(), images: ['bmw-x3-1.jpg', 'bmw-x3-2.jpg'] },
        { model: "E-Pace", brand: "Jaguar", color: "White", chassis: generateUniqueChassisCode(), images: ['e-pace-1.jpg', 'e-pace-2.jpg'] },
        { model: "GLC", brand: "Mercedes-Benz", color: "Silver", chassis: generateUniqueChassisCode(), images: ['glc-1.jpg', 'glc-2.jpg'] },
        { model: "XC90", brand: "Volvo", color: "Blue", chassis: generateUniqueChassisCode(), images: ['xc90-1.jpg', 'xc90-2.jpg'] },
        { model: "MDX", brand: "Acura", color: "Red", chassis: generateUniqueChassisCode(), images: ['mdx-1.jpg', 'mdx-2.jpg'] },
        { model: "RX", brand: "Lexus", color: "Grey", chassis: generateUniqueChassisCode(), images: ['lexus-rx-1.jpg', 'lexus-rx-2.jpg'] },
        { model: "Model S", brand: "Tesla", color: "Red", chassis: generateUniqueChassisCode(), images: ['tesla-s-1.jpg', 'tesla-s-2.jpg'] },
        { model: "Civic", brand: "Honda", color: "White", chassis: generateUniqueChassisCode(), images: ['civic-1.jpg', 'civic-2.jpg'] },
        { model: "3 Series", brand: "BMW", color: "Black", chassis: generateUniqueChassisCode(), images: ['bmw-3-1.jpg', 'bmw-3-2.jpg'] },
        { model: "Corolla", brand: "Toyota", color: "Silver", chassis: generateUniqueChassisCode(), images: ['corolla-1.jpg', 'corolla-2.jpg'] },
        { model: "Mustang", brand: "Ford", color: "Blue", chassis: generateUniqueChassisCode(), images: ['mustang-1.jpg', 'mustang-2.jpg'] },
        { model: "Cherokee", brand: "Jeep", color: "Grey", chassis: generateUniqueChassisCode(), images: ['cherokee-1.jpg', 'cherokee-2.jpg'] },
        { model: "A4", brand: "Audi", color: "White", chassis: generateUniqueChassisCode(), images: ['audi-a4-1.jpg', 'audi-a4-2.jpg'] },
        { model: "Camry", brand: "Toyota", color: "Black", chassis: generateUniqueChassisCode(), images: ['camry-1.jpg', 'camry-2.jpg'] },
        { model: "Accord", brand: "Honda", color: "Red", chassis: generateUniqueChassisCode(), images: ['accord-1.jpg', 'accord-2.jpg'] },
    ],
    questions: [
        {
            questionText: '¿MARCA CHEQUIN?'
        },
        {
            questionText: 'RADIO/TV'
        },
        {
            questionText: 'INSIGNIA TRASERA'
        },
        {
            questionText: 'INSIGNIA DELANTERA'
        },
        {
            questionText: 'CABECERAS'
        },
        {
            questionText: 'BOCINA'
        },
        {
            questionText: 'AIRE'
        },
        {
            questionText: 'BLOQUEO DE PUERTA'
        },
        {
            questionText: 'TAPIZADOS'
        },
        {
            questionText: 'CUENTA CON SUFICIENTE ACEITE?'
        },
        {
            questionText: 'MOTOR FUNCIONA BIEN?'
        },
        {
            questionText: 'CAJA FUNCIONA BIEN?'
        },
        {
            questionText: '¿TIENE TAPA LLANTA?'
        },
        {
            questionText: '¿FUNCIONA SENSOR DE LUZ AL QUITAR LA LLAVE?'
        },
        {
            questionText: '¿FUNCIONA LUZ DE GUANTERA?'
        },
        {
            questionText: '¿TIENE GOMA CANO DE VOLANTE?'
        },
        {
            questionText: '¿TIENE TAPA TABLERO ABAJO?'
        },
        {
            questionText: '¿TIENE FILTRO DE AIRE?'
        },
        {
            questionText: '¿FALTA ANTENA?'
        },
        {
            questionText: '¿FUNCIONAN ESPEJOS?'
        },
        {
            questionText: '¿PARABRISA ROTO?'
        },
        {
            questionText: '¿FARO ROTO?'
        },
        {
            questionText: '¿TIENE BATERIA?'
        },
        {
            questionText: '¿TIENE SOPORTE BATERIA?'
        },
        {
            questionText: '¿TIENE LIMPIA PARABRISA DEI-ANTERO?'
        },
        {
            questionText: '¿TIENE I-IMPIA PARABRISA TRASERO?'
        },
        {
            questionText: '¿TIENE CUBRE BARRO LH?'
        },
        {
            questionText: '¿TIENE CUBRE BARRO RH?'
        },
        {
            questionText: '¿TIENE CATALIZADOR?'
        },
        {
            questionText: 'OBSERVACION'
        }
    ]
}
