"use client"

import {
    Field,
    FieldGroup,
    FieldSet,
} from "@/components/ui/field"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function inputQuestoes() {

    return (
        <FieldSet className="flex px-10 py-5">
            <div className="flex flex-row space-x-2">
                <Field className="w-1/2">
                    <Input id="pergunta" type="text" placeholder="Pergunta" />
                </Field>
                <FieldGroup className="flex flex-row min-w-fit">
                    <Field><Input id="opcao1" type="text" placeholder="Opção 1" /></Field>
                    <Field><Input id="opcao2" type="text" placeholder="Opção 2" /></Field>
                    <Field><Input id="opcao3" type="text" placeholder="Opção 3" /></Field>
                    <Field><Input id="opcao4" type="text" placeholder="Opção 4" /></Field>
                    <Field><Input id="dificuldade" type="number" placeholder="Dificuldade"/></Field>
                </FieldGroup>
            </div>
            <div className="flex space-x-2">
                <Field className="w-1/4">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Opção correta" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="opcao1">Opção 1</SelectItem>
                            <SelectItem value="opcao2">Opção 2</SelectItem>
                            <SelectItem value="opcao3">Opção 3</SelectItem>
                            <SelectItem value="opcao4">Opção 4</SelectItem>
                        </SelectContent>

                    </Select>
                </Field>

                <Field className="flex flex-row max-w-1/10">
                    <Button type="submit" className="min-w-fit">Adicionar</Button>
                    <Button type="button" className="min-w-fit">Cancelar</Button>
                </Field>
            </div>
        </FieldSet>
    )
}