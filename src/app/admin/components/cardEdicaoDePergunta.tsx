"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@radix-ui/react-label"

export default function cardEdicaoDePergunta() {
    return (
        <Card className="w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <CardHeader>
                <CardTitle>Editar pergunta</CardTitle>
                <CardAction>
                    <Button variant="link">Cancelar</Button>
                </CardAction>
            </CardHeader>

            <CardContent>
                <FieldSet>
                    <Field>
                        <Input type="text" placeholder="Pergunta" />
                    </Field>

                    <FieldGroup className="flex flex-row min-w-fit">
                        <Field><Input id="opcao1" type="text" placeholder="Opção 1" /></Field>
                        <Field><Input id="opcao2" type="text" placeholder="Opção 2" /></Field>
                        <Field><Input id="opcao3" type="text" placeholder="Opção 3" /></Field>
                        <Field><Input id="opcao4" type="text" placeholder="Opção 4" /></Field>
                        <Field><Input id="opcao5" type="text" placeholder="Opção 5" /></Field>
                    </FieldGroup>

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
                                <SelectItem value="opcao5">Opção 5</SelectItem>
                            </SelectContent>

                        </Select>
                    </Field>


                </FieldSet>

            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Field className="flex flex-row max-w-1/10">
                    <Button type="submit" className="min-w-fit">Adicionar</Button>
                    <Button type="button" className="min-w-fit">Cancelar</Button>
                </Field>
            </CardFooter>
        </Card>
    )
}