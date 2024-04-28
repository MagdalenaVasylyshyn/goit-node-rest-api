import contactsService from "../services/contactsServices.js";
import HttpError from '../helpers/HttpError.js'

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await contactsService.listContacts();
        res.json(contacts);
    } catch (error) {
        next({});
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await contactsService.getContactById(id);
        if (!contact) {
            throw HttpError(404);
        }

        res.json(contact);
    } catch(error) {
        next(error.status ? error : {});
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await contactsService.removeContact(id);
        if (!contact) {
            throw HttpError(404);
        }

        res.json(contact);
    } catch(error) {
        next(error.status ? error : {});
    }
};

export const createContact = async (req, res, next) => {
    try {
        const {name, email, phone} = await req.body;
        const contact = await contactsService.addContact(name, email, phone);

        res.status(201).json(contact);
    } catch(error) {
        next({});
    }
};

export const updateContact = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0)
            throw HttpError(400, 'Body must have at least one field');

        const { id } = req.params;
        const contact = await contactsService.updateContact(id, req.body);

        if (!contact) throw HttpError(404);

        res.json(contact);
    } catch (error) {
        next(error.status ? error : {});
    }
};