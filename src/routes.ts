import { AuthenticateClientController } from "./modules/account/authenticateUser/AuthenticateClientController";
import { Router } from "express";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

routes.post("/client/", createClientController.handle);
routes.post("/authenticate", authenticateClientController.handle);

export { routes };
