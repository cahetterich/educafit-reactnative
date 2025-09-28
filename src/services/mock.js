// Mock de backend simples usando delays e AsyncStorage (opcionalmente swappável por API real)
import AsyncStorage from "@react-native-async-storage/async-storage";
const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));
export async function signIn(email, password) {
  await delay(400);
  if (!email || !password) throw new Error("Credenciais inválidas");
  await AsyncStorage.setItem("email", email);
  return { email, role: (await AsyncStorage.getItem("role")) || "aluno" };
}
export async function signUp({ name, email, role = "aluno" }) {
  await delay(500);
  if (!name || !email) throw new Error("Dados inválidos");
  await AsyncStorage.multiSet([
    ["name", name],
    ["email", email],
    ["role", role],
  ]);
  return { email, role };
}
export async function recover(email) {
  await delay(500);
  if (!email) throw new Error("Informe um e-mail");
  return { ok: true };
}
export async function signOut() {
  await AsyncStorage.removeItem("email");
}
